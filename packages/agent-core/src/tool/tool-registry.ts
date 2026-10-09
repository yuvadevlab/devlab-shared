/**
 * @file packages/agent-core/src/tool/tool-registry.ts
 * @description Centralized registry for cataloging, resolving, and filtering executable agent tools.
 * @module @yuva-devlab/agent-core
 */

import { DomainError, ErrorCode } from "@yuva-devlab/errors";
import { Logger, loggerWithConfig } from "@yuva-devlab/logger";
import type { AccessTier, ToolCapability } from "../constants";
import type { UniversalTool } from "../types";

const logger = loggerWithConfig(new Logger("ToolRegistry"));

/**
 * In-memory tool registry enabling fast resolution and authorization-based filtering.
 *
 * @example
 * ```typescript
 * const registry = new ToolRegistry();
 * registry.register(searchDocsTool);
 * const readTools = registry.filterByTier(AccessTier.READ_ONLY);
 * ```
 */
export class ToolRegistry {
  private readonly tools = new Map<string, UniversalTool<unknown, unknown>>();

  /**
   * Registers a single tool into the catalog.
   *
   * @param tool - UniversalTool implementation.
   */
  public register(tool: UniversalTool<unknown, unknown>): void {
    if (this.tools.has(tool.name)) {
      logger.warn(
        `[register] Overwriting previously registered tool '${tool.name}' in ToolRegistry`,
      );
    }
    this.tools.set(tool.name, tool);
    logger.debug(`[register] Registered tool '${tool.name}' in catalog`, {
      accessTier: tool.accessTier,
    });
  }

  /**
   * Registers an array of tools atomically.
   *
   * @param tools - Array of tools to register.
   */
  public registerAll(tools: UniversalTool<unknown, unknown>[]): void {
    for (const tool of tools) {
      this.register(tool);
    }
  }

  /**
   * Resolves a tool by its unique name.
   *
   * @param name - Canonical tool name.
   * @returns Registered UniversalTool or undefined if missing.
   */
  public get(name: string): UniversalTool<unknown, unknown> | undefined {
    return this.tools.get(name);
  }

  /**
   * Resolves a tool or throws a NotFound DomainError.
   *
   * @param name - Canonical tool name.
   * @returns Registered UniversalTool.
   */
  public getOrThrow(name: string): UniversalTool<unknown, unknown> {
    const tool = this.tools.get(name);
    if (!tool) {
      throw new DomainError(
        `Tool '${name}' is not registered in ToolRegistry`,
        ErrorCode.TOOL_NOT_FOUND,
        404,
      );
    }
    return tool;
  }

  /**
   * Returns all currently registered tools.
   */
  public listAll(): UniversalTool<unknown, unknown>[] {
    return Array.from(this.tools.values());
  }

  /**
   * Filters registered tools matching an allowed access tier.
   */
  public filterByTier(tier: AccessTier): UniversalTool<unknown, unknown>[] {
    return this.listAll().filter((t) => t.accessTier === tier);
  }

  /**
   * Filters registered tools requiring a specific capability (e.g. NETWORK, DATABASE).
   */
  public filterByCapability(
    capability: ToolCapability,
  ): UniversalTool<unknown, unknown>[] {
    return this.listAll().filter((t) => t.capabilities.includes(capability));
  }

  /**
   * Clears all registered tools from the catalog.
   */
  public clear(): void {
    const count = this.tools.size;
    this.tools.clear();
    logger.info("[clear] Cleared all tools from ToolRegistry", {
      removedCount: count,
    });
  }
}
