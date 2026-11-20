"use client";

import { useEffect, useState } from "react";
import styles from "./NewYearClock.module.css";

const TIME_ZONE = "Asia/Bangkok";
const BANGKOK_OFFSET_MS = 7 * 60 * 60 * 1000;
const SECONDS_PER_DAY = 86_400;
const RING_RADIUS = 23;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

const timeFormatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: TIME_ZONE,
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h23",
  calendar: "gregory",
});

const englishDateFormatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: TIME_ZONE,
  weekday: "short",
  day: "2-digit",
  month: "short",
  year: "numeric",
  calendar: "gregory",
});

const thaiDateFormatter = new Intl.DateTimeFormat("th-TH-u-ca-buddhist", {
  timeZone: TIME_ZONE,
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  era: "short",
});

const yearFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: TIME_ZONE,
  year: "numeric",
  calendar: "gregory",
});

type ClockSnapshot = {
  hour: string;
  minute: string;
  second: string;
  englishDate: string;
  thaiDate: string;
  targetYear: number;
  targetThaiYear: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  remainingSeconds: number;
  yearProgress: number;
};

function getPart(parts: Intl.DateTimeFormatPart[], type: Intl.DateTimeFormatPartTypes): string {
  return parts.find((item) => item.type === type)?.value ?? "00";
}

function getClockSnapshot(now: Date): ClockSnapshot {
  const timeParts = timeFormatter.formatToParts(now);
  const hour = getPart(timeParts, "hour");
  const minute = getPart(timeParts, "minute");
  const second = getPart(timeParts, "second");
  const currentYear = Number.parseInt(yearFormatter.format(now), 10);

  // Bangkok is UTC+7. New Year begins at 00:00 on 1 January Bangkok time.
  const yearStart = Date.UTC(currentYear, 0, 1) - BANGKOK_OFFSET_MS;
  const nextYearStart = Date.UTC(currentYear + 1, 0, 1) - BANGKOK_OFFSET_MS;
  const remainingSeconds = Math.max(0, Math.floor((nextYearStart - now.getTime()) / 1000));
  const yearDuration = nextYearStart - yearStart;
  const elapsed = Math.min(Math.max(now.getTime() - yearStart, 0), yearDuration);

  return {
    hour,
    minute,
    second,
    englishDate: englishDateFormatter.format(now).replace(/,/g, " ·").toUpperCase(),
    thaiDate: thaiDateFormatter.format(now),
    targetYear: currentYear + 1,
    targetThaiYear: currentYear + 544,
    days: Math.floor(remainingSeconds / SECONDS_PER_DAY),
    hours: Math.floor((remainingSeconds % SECONDS_PER_DAY) / 3600),
    minutes: Math.floor((remainingSeconds % 3600) / 60),
    seconds: remainingSeconds % 60,
    remainingSeconds,
    yearProgress: yearDuration > 0 ? elapsed / yearDuration : 0,
  };
}

function pad(value: number): string {
  return String(value).padStart(2, "0");
}

function padDays(value: number): string {
  return String(value).padStart(3, "0");
}

export interface NewYearClockProps {
  /** Reuses Hero's reduced-motion and data-saver decision. */
  motionEnabled: boolean;
}

/** Compact bilingual Bangkok clock and New Year countdown for the KabKraBue Hero. */
export function NewYearClock({ motionEnabled }: NewYearClockProps) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    let timeoutId: number | undefined;
    let disposed = false;

    const tick = () => {
      if (disposed || document.hidden) return;
      const current = new Date();
      setNow(current);
      timeoutId = window.setTimeout(tick, 1000 - current.getMilliseconds());
    };

    const handleVisibilityChange = () => {
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
      if (!document.hidden) tick();
    };

    tick();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      disposed = true;
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const snapshot = now ? getClockSnapshot(now) : null;
  const progress = snapshot?.yearProgress ?? 0;
  const dashOffset = RING_CIRCUMFERENCE * (1 - progress);
  const yearPercent = Math.floor(progress * 100);
  const units = [
    { key: "days", thai: "วัน", english: "DAYS", value: snapshot ? padDays(snapshot.days) : "---" },
    { key: "hours", thai: "ชั่วโมง", english: "HRS", value: snapshot ? pad(snapshot.hours) : "--" },
    { key: "minutes", thai: "นาที", english: "MIN", value: snapshot ? pad(snapshot.minutes) : "--" },
    { key: "seconds", thai: "วินาที", english: "SEC", value: snapshot ? pad(snapshot.seconds) : "--" },
  ];
  const accessibleLabel = snapshot
    ? `นาฬิกาประเทศไทย ${snapshot.hour}:${snapshot.minute}:${snapshot.second} ${snapshot.thaiDate}. ${snapshot.englishDate}. เหลือ ${snapshot.days} วัน ${snapshot.hours} ชั่วโมง ${snapshot.minutes} นาที ${snapshot.seconds} วินาที ถึงวันปีใหม่ คริสต์ศักราช ${snapshot.targetYear} พุทธศักราช ${snapshot.targetThaiYear}`
    : "นาฬิกาเวลาประเทศไทยและนับถอยหลังวันปีใหม่ / Bangkok clock and New Year countdown";

  return (
    <div className={styles.position}>
      <section
        className={styles.card}
        data-motion={motionEnabled ? "on" : "off"}
        data-finale={snapshot && snapshot.remainingSeconds <= 60 ? "true" : "false"}
        role="timer"
        aria-label={accessibleLabel}
        aria-live="off"
      >
        <span className={styles.ambient} aria-hidden="true" />
        <span className={styles.lightSweep} aria-hidden="true" />
        <span className={`${styles.sparkle} ${styles.sparkleOne}`} aria-hidden="true" />
        <span className={`${styles.sparkle} ${styles.sparkleTwo}`} aria-hidden="true" />
        <span className={`${styles.sparkle} ${styles.sparkleThree}`} aria-hidden="true" />

        <div className={styles.content} aria-hidden="true">
          <div className={styles.topLine}>
            <div className={styles.brandLine}>
              <span className={styles.liveDot} />
              <span className={styles.titleStack}>
                <span className={styles.titleThai}>ก้าวสู่ปีใหม่</span>
                <span className={styles.titleEnglish}>THE MIDNIGHT EDITION</span>
              </span>
            </div>

            <div className={styles.targetBadge}>
              <span className={styles.targetCaption}>NEXT YEAR · 01 JAN</span>
              <span className={styles.targetYears}>
                <span>{snapshot?.targetYear ?? "----"}</span>
                <i aria-hidden="true">/</i>
                <b>พ.ศ. {snapshot?.targetThaiYear ?? "----"}</b>
              </span>
            </div>
          </div>

          <div className={styles.middleLine}>
            <div className={styles.countdownGrid}>
              {units.map((unit) => (
                <div className={styles.unit} key={unit.key}>
                  <span className={styles.unitValueWrap}>
                    <span
                      className={`${styles.unitValue} ${motionEnabled && snapshot ? styles.digitTick : ""}`}
                      key={`${unit.key}-${unit.value}`}
                    >
                      {unit.value}
                    </span>
                  </span>
                  <span className={styles.unitLabelStack}>
                    <span className={styles.unitThai}>{unit.thai}</span>
                    <span className={styles.unitEnglish}>{unit.english}</span>
                  </span>
                </div>
              ))}
            </div>

            <div className={styles.yearMeter}>
              <svg className={styles.meterSvg} viewBox="0 0 56 56" role="presentation">
                <circle className={styles.meterTrack} cx="28" cy="28" r={RING_RADIUS} />
                <circle
                  className={styles.meterProgress}
                  cx="28"
                  cy="28"
                  r={RING_RADIUS}
                  strokeDasharray={RING_CIRCUMFERENCE}
                  strokeDashoffset={dashOffset}
                />
              </svg>
              <span className={styles.meterValue}>{yearPercent}<small>%</small></span>
              <span className={styles.meterOrbit}>
                <i />
              </span>
            </div>
          </div>

          <div className={styles.bottomLine}>
            <div className={styles.dateStack}>
              <span className={styles.thaiDate}>{snapshot?.thaiDate ?? "กำลังเชื่อมต่อเวลาไทย…"}</span>
              <span className={styles.englishDate}>{snapshot?.englishDate ?? "SYNCING BANGKOK TIME"}</span>
            </div>
            <time className={styles.liveTime} dateTime={now?.toISOString()}>
              <span className={styles.localLabel}>BKK</span>
              <span>{snapshot?.hour ?? "--"}</span>
              <i>:</i>
              <span>{snapshot?.minute ?? "--"}</span>
              <i>:</i>
              <span className={styles.seconds}>{snapshot?.second ?? "--"}</span>
            </time>
          </div>

          <div className={styles.progressTrack}>
            <span className={styles.progressFill} style={{ transform: `scaleX(${progress})` }} />
          </div>
        </div>
      </section>
    </div>
  );
}
