export function areBothArrayEquals<T>(arr1: T[], arr2: T[]): boolean {
  if (arr1.length !== arr2.length) {
    return false;
  }
  return arr1.every((item, index) => item === arr2[index]);
}
