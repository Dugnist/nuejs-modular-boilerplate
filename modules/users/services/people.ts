// @ts-ignore
import { parseCSV } from "/shared/utils/parseCSV.js";
// @ts-ignore
import { sortByKey } from "/shared/utils/sortByKey.js";
// @ts-ignore
import { setupMocks } from "/shared/utils/setupMocks.js";

const is_browser = typeof window == "object";

async function fetchCached(path: string) {
  if (is_browser) {
    const cached = sessionStorage[path];

    if (cached) return cached;

    try {
      const csv = await fetch("/shared/mocks/" + path);

      return (sessionStorage[path] = await csv.text());
    } catch (e) {
      console.error(e);
    }
  } else {
    const csv = await fetch(`file:${process.cwd()}/${path}`);
    return await csv.text();
  }
}

export async function fetchPeople(type, fetch_all) {
  // type can be empty string
  if (!type) type = "members";

  const data = JSON.parse(await fetchCached(`${type}.json`));
  const people = parseCSV(data.entries);

  if (fetch_all) {
    const tail = await fetchCached(`${type}-tail.csv`);
    people.push(...parseCSV(tail));
  } else if (is_browser) {
    setTimeout(() => fetchCached(`${type}-tail.csv`), 2718); // Neper constant
  }

  if (data.is_mock) setupMocks(people, type);

  return { people, total: data.total };
}

export const getPeople = async (opts) => {
  const { start = 0, limit = 30, sort = "created", search } = opts || {};
  let { people, total } = await fetchPeople(opts.type, Object.keys(opts)[0]);

  sortByKey(sort, people);

  if (search) {
    const hasMatch = (a, b) => a?.toLowerCase().includes(b?.toLowerCase());
    people = people.filter(
      (el: any) => hasMatch(el.name, search) || hasMatch(el.email, search)
    );
    total = people.length;
  }

  return { total, people: people.slice(start, start + limit) };
};
