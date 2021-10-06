import { useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { animateScroll, scroller } from 'react-scroll';

export default function useHashScroll(resolveAnchor: (path: string) => string | undefined, offset?: number) {
  const { pathname, hash, search } = useLocation();

  useEffect(() => {
    const anchor = resolveAnchor(hash);
    anchor && bouncingScroll(anchor);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const bouncingScroll = useCallback(
    (elementName: string) => {
      const elements = document.getElementsByName(elementName);
      if (elements.length === 0) return;

      const { y } = elements[0].getBoundingClientRect();
      const currentY = window.pageYOffset;

      if (currentY < y) {
        // scroll down
        animateScroll.scrollTo(currentY - 256, {
          duration: 200,
          delay: 0,
          smooth: 'easeInCubic',
        });
      } else {
        // scroll up
        animateScroll.scrollTo(currentY + 256, {
          duration: 200,
          delay: 0,
          smooth: 'easeInCubic',
        });
      }

      setTimeout(() => {
        scroller.scrollTo(elementName, {
          duration: 600,
          delay: 0,
          smooth: 'easeOutCubic',
          offset,
        });
      }, 200);
    },
    [offset],
  );

  const toPath = useCallback((value: string) => `${pathname}${search ?? ''}${value}`, [pathname, search]);

  return { scroll: bouncingScroll, hash, toPath };
}
