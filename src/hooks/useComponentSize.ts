import { useEffect, useRef, useState } from 'react';

import usePrevious from './usePrevious';
import { useWindowSize } from './useWindowSize';

export default function useComponentSize<T extends HTMLElement>() {
  const targetRef = useRef<T>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const { width, height } = useWindowSize();
  const oldWidth = usePrevious(width);

  useEffect(() => {
    if (targetRef.current && oldWidth !== width) {
      setDimensions({
        width: targetRef.current.offsetWidth,
        height: targetRef.current.offsetHeight,
      });
    }
  }, [oldWidth, width]);

  return { dimensions, ref: targetRef };
}
