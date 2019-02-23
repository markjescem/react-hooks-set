import { noop } from '.';

type EventHandler = (event?: Event) => void;

export let supportsPassive = false;

try {
  const opts = {};
  Object.defineProperty(opts, 'passive', {
    get() {
      supportsPassive = true;
    }
  });
  window.addEventListener('test-passive', noop, opts);
} catch (error) {}

export function on(
  target: HTMLElement | Window,
  event: string,
  handler: EventHandler,
  passive = false
) {
  target.addEventListener(
    event,
    handler,
    supportsPassive ? { capture: false, passive } : false
  );
}

export function off(
  target: HTMLElement | Window,
  event: string,
  handler: EventHandler
) {
  target.removeEventListener(event, handler);
}

export function stop(event: Event) {
  event.stopPropagation();
}

export function prevent(event: Event) {
  event.preventDefault();
}
