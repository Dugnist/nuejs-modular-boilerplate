export const sortByKey = (key: string, arr: object[]) => {
  arr.sort((obj_a, obj_b) => {
    const a = obj_a[key],
      b = obj_b[key];
    const diff = 1 * a ? b - a : a?.localeCompare(b);
    return diff;
  });
  return arr;
};
