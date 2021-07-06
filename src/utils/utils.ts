export function wrapAsset(path: string) {
  return `url('${path}')`;
}

export function combineClassNames(...classNames: string[]) {
  return classNames.join(' ');
}
