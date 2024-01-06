import { expect, test } from "vitest";
import { formatTime } from "./time";

test.each([
  [0, "00:00"],
  [1, "00:00"],
  [1000, "00:01"],
  [10000, "00:10"],
  [60000, "01:00"],
  [66666, "01:07"],
  [59999, "01:00"],
  [76900000, "21:21:40"],
  [3599000, "59:59"],
  [3599500, "01:00:00"]

])('Format %i should be %s', (m, s) => {
  expect(formatTime(m)).toBe(s);
});
