export const padEnd = <T, K>(
  array: T[],
  minLength: number,
  fillValue: K
): T[] => {
  return Object.assign(new Array(minLength).fill(fillValue), array)
}
