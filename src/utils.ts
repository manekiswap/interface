export function capitalizeFirstLetter(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function wrapAsset(asset: any) {
  return `url('${asset}')`;
}
