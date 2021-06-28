import { useThemeUI } from 'theme-ui';

export function capitalizeFirstLetter(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function wrapAsset(asset: any) {
  return `url('${asset}')`;
}

export function combineClassNames(...classNames: string[]) {
  return classNames.join(' ');
}

export function useInvertedColorMode(key: string): string | undefined {
  const {
    theme: { rawColors },
    colorMode,
  } = useThemeUI();

  const invertedMode = colorMode === 'dark' ? 'light' : 'dark';
  const value = rawColors?.modes?.[invertedMode][key];

  return value as string;
}
