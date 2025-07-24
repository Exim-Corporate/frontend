export interface AnimateOptions {
  baseDelay?: number;
  maxDelay?: number;
}

/**
 * Animates a numeric value from 0 to target with ease-out delay.
 */
export function animateValue(
  target: number,
  update: (val: number) => void,
  options: AnimateOptions = {}
): void {
  const { baseDelay = 20, maxDelay = 300 } = options;
  const largeStep = Math.max(1, Math.ceil(target * 0.01));
  let current = 0;

  function tick() {
    // choose step: 2% until 95%, then slow 1 unit
    const progress = current / target;
    const step = progress >= 0.95 ? 1 : largeStep;
    current = Math.min(current + step, target);
    update(current);
    if (current < target) {
      // delay: minimal until 95%, then maxDelay
      const delay = progress >= 0.95 ? maxDelay : baseDelay;
      setTimeout(tick, delay);
    }
  }

  tick();
}
