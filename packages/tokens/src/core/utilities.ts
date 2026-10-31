/**
 * @file src/core/utilities.ts
 * @description Universal utility classes, glassmorphism, background patterns, and animations.
 */

/**
 * Universal utility styles governed by Cascade Layer @layer dl-utilities.
 */
export const UTILITIES_CSS = `
@layer dl-utilities {
  .execution-grid {
    background-image:
      linear-gradient(var(--border) 1px, transparent 1px),
      linear-gradient(90deg, var(--border) 1px, transparent 1px);
    background-size: 36px 36px;
    mask-image: linear-gradient(to bottom, black, transparent 72%);
  }

  .topology-grid {
    background-image: radial-gradient(
      circle at center,
      var(--border) 1px,
      transparent 1px
    );
    background-size: 18px 18px;
    mask-image: linear-gradient(
      90deg,
      transparent,
      black 15%,
      black 85%,
      transparent
    );
  }

  .glass {
    background-color: var(--surface);
    backdrop-filter: blur(16px) saturate(140%);
    -webkit-backdrop-filter: blur(16px) saturate(140%);
    border: 1px solid var(--border);
  }

  .mesh-bg {
    background-image:
      radial-gradient(
        60rem 30rem at 12% -10%,
        color-mix(in oklch, var(--primary) 16%, transparent),
        transparent 70%
      ),
      radial-gradient(
        50rem 26rem at 95% 0%,
        color-mix(in oklch, var(--info) 14%, transparent),
        transparent 70%
      );
  }

  .text-gradient {
    background-image: linear-gradient(
      100deg,
      var(--foreground) 10%,
      color-mix(in oklch, var(--primary) 85%, var(--foreground)) 60%
    );
    background-clip: text;
    color: transparent;
  }

  .animate-agent-pulse {
    animation: agent-pulse 1.8s ease-in-out infinite;
  }

  .animate-signal-travel {
    animation: signal-travel 1.5s linear infinite;
  }

  .animate-progress-flow {
    animation: progress-flow 1.8s ease-in-out infinite;
  }

  .runner-enter {
    animation: runner-enter 260ms ease-out both;
  }

  .pulse-dot {
    animation: pulse-ring 1.8s ease-out infinite;
  }

  @keyframes pulse-ring {
    0% {
      box-shadow: 0 0 0 0 color-mix(in oklch, var(--primary) 45%, transparent);
    }
    100% {
      box-shadow: 0 0 0 8px transparent;
    }
  }

  @keyframes agent-pulse {
    0%,
    100% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 0.65;
      transform: scale(0.97);
    }
  }

  @keyframes signal-travel {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }

  @keyframes progress-flow {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  @keyframes runner-enter {
    from {
      opacity: 0;
      transform: translateY(6px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
}
`;
