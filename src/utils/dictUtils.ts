import { MersenneTwister19937, Random } from "random-js";

const BEGIN_OF_TIME = new Date(2023, 7, 15);

export function genWords(ws: string[], seed: number): string[] {
  const random = new Random(MersenneTwister19937.seed(seed));
  const ids: number[] = [];
  while (ids.length < 32) {
    // NOTE: actualy it should be ws.length - 1, but this will break history,
    // so it must be filtered out later.
    const next = random.integer(0, ws.length);
    if (!ids.includes(next) && next < ws.length && ws[next].indexOf("-") === -1)
      ids.push(next);
  }

  return ids.map((x) => ws[x]);
}

export function idForDate(d: Date): number {
  d.setHours(0, 0, 0, 0);
  return (d.getTime() - BEGIN_OF_TIME.getTime()) / 24 / 3600 / 1000 + 1;
}

export function seedForId(id: number): number {
  return BEGIN_OF_TIME.getTime() / 1000 + (id - 1) * 24 * 3600;
}
