const MIN_THINKING_MS = 700;
const MAX_THINKING_MS = 1000;

export function getThinkingDelayMs(): number {
  return (
    MIN_THINKING_MS +
    Math.floor(Math.random() * (MAX_THINKING_MS - MIN_THINKING_MS + 1))
  );
}

export function thinkingDelay(): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, getThinkingDelayMs());
  });
}
