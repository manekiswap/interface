export function wrapAsset(path: string) {
  return `url('${path}')`;
}

export function combineClassNames(...classNames: Array<string | undefined>) {
  return classNames.join(' ');
}
