import { expect, test } from "vitest";
import { idForDate } from "./dictUtils";

test("Game id for date", () => {
  expect(idForDate(new Date(2023, 7, 15))).toEqual(1);
  expect(idForDate(new Date(2023, 8, 20))).toEqual(6 + 31);
});
test("idForDate is integer across DST", () => {
  expect(idForDate(new Date(2023, 11, 1))).toEqual(109);
});
