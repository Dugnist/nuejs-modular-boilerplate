import { createObjectFromKeysValues } from "./createObjectFromKeysValues.js";

export const parseCSV = (csv: string) => {
  const [head, ...rows] = csv.split("\n");
  const keys = head.split(",");

  return rows.map((row) => createObjectFromKeysValues(keys, row.split(",")));
};
