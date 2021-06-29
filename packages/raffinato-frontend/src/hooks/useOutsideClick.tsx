import { RefObject, useEffect } from 'react';

type AnyEvent = MouseEvent | TouchEvent;

function useOutsideClick<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>[] | RefObject<T>,
  handler: (event: AnyEvent) => void
) {
  useEffect(() => {
    const listener = (event: AnyEvent) => {
      if (Array.isArray(ref)) {
        const isChildClicked = ref.some((currentRef) => {
          const el = currentRef?.current;

          if (el?.contains(event.target as Node)) {
            return true;
          }

          return false;
        });

        if (!isChildClicked) {
          handler(event);
        }
      }

      const el = (ref as RefObject<T>)?.current;

      if (!el || el.contains(event.target as Node)) {
        return;
      }

      handler(event);
    };

    document.addEventListener(`mousedown`, listener);
    document.addEventListener(`touchstart`, listener);

    return () => {
      document.removeEventListener(`mousedown`, listener);
      document.removeEventListener(`touchstart`, listener);
    };
  }, [ref, handler]);
}

export default useOutsideClick;
