export const createObjectFromKeysValues = (
  keys: string[],
  values: string[]
) => {
  const entry = {};

  keys.forEach((key, i) => {
    const val: any = values[i];
    entry[key] = 1 * val || val;
  });

  return entry;
};
