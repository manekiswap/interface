export function feeTierPercent(fee: number): string {
  return (fee / 10000).toPrecision(1) + '%';
}
