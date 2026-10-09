/**
 * @file packages/events/src/bus/in-memory-event-bus.ts
 * @description Fast, non-blocking in-memory event bus implementation supporting wildcards.
 * @module @yuva-devlab/events
 */

import { logger } from "@yuva-devlab/logger";
import type {
  DomainEventEnvelope,
  EventHandler,
  EventSubscription,
  IEventBus,
} from "../contracts";

/**
 * In-memory event bus with pattern matching, asynchronous execution, and fault isolation.
 */
export class InMemoryEventBus implements IEventBus {
  /** Map of event pattern to set of subscribed callback handlers */
  private readonly subscribers = new Map<string, Set<EventHandler>>();

  /**
   * Emits a single domain event envelope to all matching listeners.
   *
   * @param event - The validated event envelope.
   */
  public async publish(event: DomainEventEnvelope): Promise<void> {
    const matchingHandlers = this.getMatchingHandlers(event.eventType);

    // If no handlers are subscribed, return early
    if (matchingHandlers.length === 0) {
      return;
    }

    // Execute all handlers concurrently with isolated failure boundaries
    await Promise.allSettled(
      matchingHandlers.map(async (handler) => {
        try {
          await handler(event);
        } catch (error) {
          logger.error("Event handler threw an unhandled exception", {
            eventType: event.eventType,
            eventId: event.eventId,
            error: error instanceof Error ? error.message : String(error),
          });
        }
      }),
    );
  }

  /**
   * Emits an array of domain events sequentially or concurrently.
   *
   * @param events - List of event envelopes to publish.
   */
  public async publishBatch(events: DomainEventEnvelope[]): Promise<void> {
    for (const event of events) {
      await this.publish(event);
    }
  }

  /**
   * Registers a listener for an exact event type or wildcard pattern (*, domain.*).
   *
   * @param eventPattern - Topic pattern to subscribe to.
   * @param handler - Asynchronous callback handler.
   * @returns Unsubscribe handle.
   */
  public subscribe(
    eventPattern: string,
    handler: EventHandler,
  ): EventSubscription {
    if (!this.subscribers.has(eventPattern)) {
      this.subscribers.set(eventPattern, new Set());
    }

    const handlerSet = this.subscribers.get(eventPattern)!;
    handlerSet.add(handler);

    return {
      unsubscribe: () => {
        handlerSet.delete(handler);
        // Clean up empty key
        if (handlerSet.size === 0) {
          this.subscribers.delete(eventPattern);
        }
      },
    };
  }

  /**
   * Clears all active subscribers from memory.
   */
  public clear(): void {
    this.subscribers.clear();
  }

  /**
   * Resolves all handlers matching the given concrete event type.
   *
   * @param concreteType - The incoming eventType string.
   * @returns Array of unique matching handlers.
   */
  private getMatchingHandlers(concreteType: string): EventHandler[] {
    const matching = new Set<EventHandler>();

    for (const [pattern, handlers] of this.subscribers.entries()) {
      if (this.matchesPattern(pattern, concreteType)) {
        for (const handler of handlers) {
          matching.add(handler);
        }
      }
    }

    return Array.from(matching);
  }

  /**
   * Evaluates if a concrete event type matches a subscription pattern.
   * Supports global wildcard "*" and prefix wildcards "prefix.*".
   *
   * @param pattern - Registered pattern.
   * @param target - Concrete event type.
   * @returns True if matched.
   */
  private matchesPattern(pattern: string, target: string): boolean {
    // Exact match or universal catch-all
    if (pattern === "*" || pattern === target) {
      return true;
    }

    // Prefix wildcard match (e.g. "AGENT.*")
    if (pattern.endsWith(".*")) {
      const prefix = pattern.slice(0, -2);
      return target.startsWith(prefix + ".");
    }

    return false;
  }
}
