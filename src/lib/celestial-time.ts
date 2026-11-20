/** Pure Thailand-time helpers for the KabKraBue Celestial Timepiece. */
export const CELESTIAL_TIME_ZONE = "Asia/Bangkok";

const BANGKOK_OFFSET_MS = 7 * 60 * 60 * 1_000;
const SECOND_MS = 1_000;
const YEAR_FORMATTER = new Intl.DateTimeFormat("en-US-u-ca-gregory-nu-latn", {
  timeZone: CELESTIAL_TIME_ZONE,
  year: "numeric",
});
const BANGKOK_PARTS_FORMATTER = new Intl.DateTimeFormat("en-GB-u-ca-gregory-nu-latn", {
  timeZone: CELESTIAL_TIME_ZONE,
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h23",
});
const CLOCK_FORMATTER = new Intl.DateTimeFormat("en-GB-u-ca-gregory-nu-latn", {
  timeZone: CELESTIAL_TIME_ZONE,
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h23",
});
const THAI_DATE_FORMATTER = new Intl.DateTimeFormat("th-TH-u-ca-buddhist-nu-latn", {
  timeZone: CELESTIAL_TIME_ZONE,
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});
const ENGLISH_DATE_FORMATTER = new Intl.DateTimeFormat("en-GB-u-ca-gregory-nu-latn", {
  timeZone: CELESTIAL_TIME_ZONE,
  weekday: "short",
  day: "2-digit",
  month: "short",
  year: "numeric",
});

type BangkokParts = {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
};

export type CelestialClockSnapshot = {
  instantIso: string;
  hour: string;
  minute: string;
  second: string;
  thaiDate: string;
  englishDate: string;
  currentYear: number;
  targetYear: number;
  targetBuddhistYear: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  secondsToNewYear: number;
  progress: number;
  isFinalMinute: boolean;
  isMidnightFinale: boolean;
};

function getBangkokParts(instant: Date): BangkokParts {
  const parts = BANGKOK_PARTS_FORMATTER.formatToParts(instant);
  const value = (type: string) => Number(parts.find((part) => part.type === type)?.value ?? 0);
  return {
    year: value("year"),
    month: value("month"),
    day: value("day"),
    hour: value("hour"),
    minute: value("minute"),
    second: value("second"),
  };
}

/** Midnight on January 1 in Bangkok, expressed as an absolute UTC instant. */
export function bangkokNewYearInstant(year: number): number {
  return Date.UTC(year, 0, 1) - BANGKOK_OFFSET_MS;
}

/**
 * Formats an instant in the explicit Asia/Bangkok time zone and counts down to
 * the next Bangkok-local New Year. Bangkok currently observes UTC+7 without DST.
 */
export function getCelestialClockSnapshot(now: Date): CelestialClockSnapshot {
  const instantMs = now.getTime();
  if (!Number.isFinite(instantMs)) throw new RangeError("A valid instant is required");

  const parts = getBangkokParts(now);
  const currentYear = parts.year;
  const yearStart = bangkokNewYearInstant(currentYear);
  const nextYear = bangkokNewYearInstant(currentYear + 1);
  // Ceil keeps a positive sub-second remainder from displaying a premature zero.
  const secondsToNewYear = Math.max(0, Math.ceil((nextYear - instantMs) / SECOND_MS));
  const timeParts = CLOCK_FORMATTER.formatToParts(now);
  const getTimePart = (type: string) => timeParts.find((part) => part.type === type)?.value ?? "00";

  return {
    instantIso: now.toISOString(),
    hour: getTimePart("hour"),
    minute: getTimePart("minute"),
    second: getTimePart("second"),
    thaiDate: THAI_DATE_FORMATTER.format(now),
    englishDate: ENGLISH_DATE_FORMATTER.format(now),
    currentYear,
    targetYear: currentYear + 1,
    targetBuddhistYear: currentYear + 1 + 543,
    days: Math.floor(secondsToNewYear / 86_400),
    hours: Math.floor((secondsToNewYear % 86_400) / 3_600),
    minutes: Math.floor((secondsToNewYear % 3_600) / 60),
    seconds: secondsToNewYear % 60,
    secondsToNewYear,
    progress: Math.max(0, Math.min(100, ((instantMs - yearStart) / (nextYear - yearStart)) * 100)),
    isFinalMinute: secondsToNewYear > 0 && secondsToNewYear <= 60,
    isMidnightFinale: parts.month === 1 && parts.day === 1 && parts.hour === 0 && parts.minute === 0 && parts.second < 15,
  };
}
