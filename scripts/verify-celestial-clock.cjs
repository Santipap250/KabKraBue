/* Boundary tests for the dependency-free Bangkok clock helper. */
const assert = require("node:assert/strict");
process.env.TZ = "Pacific/Honolulu"; // A non-Bangkok device zone must not affect results.
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const ts = require("typescript");

const projectRoot = path.resolve(__dirname, "..");
const sourcePath = path.join(projectRoot, "src/lib/celestial-time.ts");
const source = fs.readFileSync(sourcePath, "utf8");
const compiled = ts.transpileModule(source, {
  fileName: sourcePath,
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS },
}).outputText;
const moduleRecord = { exports: {} };
vm.runInNewContext(compiled, {
  module: moduleRecord,
  exports: moduleRecord.exports,
  Intl,
  Date,
  Math,
  Number,
  RangeError,
});
const { bangkokNewYearInstant, getCelestialClockSnapshot } = moduleRecord.exports;
const at = (iso) => getCelestialClockSnapshot(new Date(iso));

assert.equal(typeof getCelestialClockSnapshot, "function");
assert.equal(typeof bangkokNewYearInstant, "function");
assert.equal(bangkokNewYearInstant(2027), Date.parse("2026-12-31T17:00:00.000Z"));

// Bangkok New Year 2027 begins at 2026-12-31 17:00:00 UTC.
const beforeTwo = at("2026-12-31T16:59:58.000Z");
assert.deepEqual(
  [beforeTwo.hour, beforeTwo.minute, beforeTwo.second, beforeTwo.days, beforeTwo.hours, beforeTwo.minutes, beforeTwo.seconds, beforeTwo.targetYear, beforeTwo.targetBuddhistYear],
  ["23", "59", "58", 0, 0, 0, 2, 2027, 2570],
);
assert.equal(beforeTwo.isFinalMinute, true);

const beforeOne = at("2026-12-31T16:59:59.000Z");
assert.deepEqual([beforeOne.hour, beforeOne.minute, beforeOne.second, beforeOne.seconds], ["23", "59", "59", 1]);

const afterRollover = at("2026-12-31T17:00:00.000Z");
assert.deepEqual(
  [afterRollover.hour, afterRollover.minute, afterRollover.second, afterRollover.currentYear, afterRollover.targetYear, afterRollover.targetBuddhistYear],
  ["00", "00", "00", 2027, 2028, 2571],
);
assert.equal(afterRollover.days, 365);
assert.equal(afterRollover.secondsToNewYear, 365 * 86_400);
assert.equal(afterRollover.isFinalMinute, false);
assert.equal(afterRollover.isMidnightFinale, true);
assert.equal(at("2026-12-31T17:00:14.000Z").isMidnightFinale, true);
assert.equal(at("2026-12-31T17:00:15.000Z").isMidnightFinale, false);

// The final-minute visual state includes exactly T−60, and excludes T−61.
const atSixty = at("2026-12-31T16:59:00.000Z");
assert.equal(atSixty.secondsToNewYear, 60);
assert.equal(atSixty.isFinalMinute, true);
assert.equal(at("2026-12-31T16:58:59.000Z").isFinalMinute, false);
assert.equal(at("2026-12-31T16:59:01.000Z").isFinalMinute, true);

// A visitor/device timezone of Pacific/Honolulu does not change Bangkok date or time.
const timezoneProof = at("2026-12-31T16:59:58.000Z");
assert.match(timezoneProof.thaiDate, /2569/);
assert.match(timezoneProof.englishDate, /2026/);
assert.deepEqual([timezoneProof.hour, timezoneProof.minute, timezoneProof.second], ["23", "59", "58"]);

// Early-year day counts are intentionally allowed to exceed two digits.
const earlyYear = at("2027-01-01T00:00:00.000Z"); // 07:00 in Bangkok
assert.ok(earlyYear.days > 99, `early-year days were ${earlyYear.days}`);
assert.equal(earlyYear.currentYear, 2027);
assert.equal(earlyYear.targetYear, 2028);

// Year-progress starts at zero, reaches its midpoint, and remains below 100 before rollover.
const yearStart = at("2026-12-31T17:00:00.000Z");
assert.equal(yearStart.progress, 0);
const midYear = at("2027-07-02T05:00:00.000Z");
assert.ok(midYear.progress > 49.9 && midYear.progress < 50.1, `mid-year progress was ${midYear.progress}`);
const finalSecond = at("2027-12-31T16:59:59.000Z");
assert.ok(finalSecond.progress > 99.999 && finalSecond.progress < 100);

// Leap-year interval to New Year 2029 is 366 days.
const leapYearStart = at("2027-12-31T17:00:00.000Z");
assert.equal(leapYearStart.currentYear, 2028);
assert.equal(leapYearStart.days, 366);

assert.throws(() => getCelestialClockSnapshot(new Date(Number.NaN)), RangeError);
console.log("PASS: explicit Asia/Bangkok time despite Pacific/Honolulu device timezone");
console.log("PASS: Thai Buddhist Era and English Gregorian dates");
console.log("PASS: T−61/T−60/T−59, final 60 seconds, exact year rollover and midnight finale");
console.log("PASS: automatic next-year target, early-year three-digit day count and leap-year interval");
console.log("PASS: year-progress at start, midpoint and final second");
