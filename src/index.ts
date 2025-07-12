const EMPTY: RecursiveArray = [];

type RecursiveArray = (string | number | RecursiveArray)[];

export function leftDiffDeep(...args: RecursiveArray[]): RecursiveArray {
  if (args.length < 2) {
    return EMPTY;
  }

  if (args.some(arg => !Array.isArray(arg))) {
    return EMPTY;
  }

  const [first, ...rest] = args;

  // @ts-ignore
  const diff = new Set(first.flat(Infinity));
  // @ts-ignore
  const others = rest.flat(Infinity);
  for (const item of others) {
    diff.delete(item);
  }
  return Array.from(diff);
}

export function leftDiff(...args: RecursiveArray[]): RecursiveArray {
  if (args.length < 2) {
    return EMPTY;
  }

  if (args.some(arg => !Array.isArray(arg))) {
    return EMPTY;
  }

  const [first, ...rest] = args;
  const diff = new Set(first);
  for (const item of rest.flat()) {
    diff.delete(item);
  }
  return Array.from(diff);
}
