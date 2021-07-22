import { useWindowSize } from './useWindowSize';

export default function useIsWindowWider(value: number) {
  const { width = 0 } = useWindowSize();
  return width >= value;
}
