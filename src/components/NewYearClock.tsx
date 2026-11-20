"use client";

import { useEffect, useState } from "react";
import styles from "./NewYearClock.module.css";

const TIME_ZONE = "Asia/Bangkok";
const BANGKOK_OFFSET_MS = 7 * 60 * 60 * 1000;
const SECONDS_PER_DAY = 24 * 60 * 60;
const RING_RADIUS = 22;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

const timeFormatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: TIME_ZONE,
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h23",
  calendar: "gregory",
});

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: TIME_ZONE,
  weekday: "short",
  day: "2-digit",
  month: "short",
  year: "numeric",
  calendar: "gregory",
});

const yearFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: TIME_ZONE,
  year: "numeric",
  calendar: "gregory",
});

const thaiDateFormatter = new Intl.DateTimeFormat("th-TH", {
  timeZone: TIME_ZONE,
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  calendar: "gregory",
});

type ClockSnapshot = {
  hour: string;
  minute: string;
  second: string;
  dateLabel: string;
  spokenDate: string;
  targetYear: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  remainingSeconds: number;
  yearProgress: number;
};

function part(parts: Intl.DateTimeFormatPart[], type: Intl.DateTimeFormatPartTypes): string {
  return parts.find((item) => item.type === type)?.value ?? "00";
}

function getClockSnapshot(now: Date): ClockSnapshot {
  const timeParts = timeFormatter.formatToParts(now);
  const hour = part(timeParts, "hour");
  const minute = part(timeParts, "minute");
  const second = part(timeParts, "second");
  const currentYear = Number.parseInt(yearFormatter.format(now), 10);

  // Thailand stays on UTC+7. New Year begins at 00:00 on 1 January Bangkok time.
  const yearStart = Date.UTC(currentYear, 0, 1) - BANGKOK_OFFSET_MS;
  const nextYearStart = Date.UTC(currentYear + 1, 0, 1) - BANGKOK_OFFSET_MS;
  const remainingSeconds = Math.max(0, Math.floor((nextYearStart - now.getTime()) / 1000));
  const yearDuration = nextYearStart - yearStart;
  const elapsed = Math.min(Math.max(now.getTime() - yearStart, 0), yearDuration);

  return {
    hour,
    minute,
    second,
    dateLabel: dateFormatter.format(now).replace(",", " ·").toUpperCase(),
    spokenDate: thaiDateFormatter.format(now),
    targetYear: currentYear + 1,
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

export interface NewYearClockProps {
  /** Reuses the Hero's reduced-motion and data-saver decision. */
  motionEnabled: boolean;
}

/** Compact Bangkok-local clock and New Year countdown for the KabKraBue Hero. */
export function NewYearClock({ motionEnabled }: NewYearClockProps) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    let timeoutId: number | undefined;
    let disposed = false;

    const tick = () => {
      if (disposed || document.hidden) return;
      const current = new Date();
      setNow(current);
      // Align to the next second to prevent timer drift.
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
    { key: "days", label: "DAYS", value: snapshot ? String(snapshot.days).padStart(2, "0") : "---" },
    { key: "hours", label: "HRS", value: snapshot ? pad(snapshot.hours) : "--" },
    { key: "minutes", label: "MIN", value: snapshot ? pad(snapshot.minutes) : "--" },
    { key: "seconds", label: "SEC", value: snapshot ? pad(snapshot.seconds) : "--" },
  ];
  const accessibleLabel = snapshot
    ? `เวลาประเทศไทย ${snapshot.hour} นาฬิกา ${snapshot.minute} นาที ${snapshot.second} วินาที ${snapshot.spokenDate} เหลือ ${snapshot.days} วัน ${snapshot.hours} ชั่วโมง ${snapshot.minutes} นาที ${snapshot.seconds} วินาที ถึงวันปีใหม่ พ.ศ. ${snapshot.targetYear + 543}`
    : "นาฬิกาเวลาประเทศไทยและนับถอยหลังวันปีใหม่";

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
        <div className={styles.content} aria-hidden="true">
          <div className={styles.topLine}>
            <div className={styles.eyebrow}>
              <span className={styles.liveDot} />
              <span>NEW YEAR COUNTDOWN</span>
            </div>
            <span className={styles.targetDate}>01 JAN <b>{snapshot?.targetYear ?? "----"}</b></span>
          </div>

          <div className={styles.middleLine}>
            <div className={styles.countdownGrid}>
              {units.map((unit) => (
                <div className={styles.unit} key={unit.key}>
                  <span
                    className={`${styles.unitValue} ${motionEnabled && snapshot ? styles.digitTick : ""}`}
                    key={`${unit.key}-${unit.value}`}
                  >
                    {unit.value}
                  </span>
                  <span className={styles.unitLabel}>{unit.label}</span>
                </div>
              ))}
            </div>

            <div className={styles.yearMeter}>
              <svg className={styles.meterSvg} viewBox="0 0 56 56">
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
              <span className={styles.orbit}>
                <i />
              </span>
            </div>
          </div>

          <div className={styles.bottomLine}>
            <span className={styles.dateLabel}>{snapshot?.dateLabel ?? "SYNCING BANGKOK TIME"}</span>
            <time className={styles.liveTime} dateTime={now?.toISOString()}>
              <span className={styles.localLabel}>BKK</span>
              <span>{snapshot?.hour ?? "--"}</span>
              <i>:</i>
              <span>{snapshot?.minute ?? "--"}</span>
              <i>:</i>
              <span className={styles.seconds}>{snapshot?.second ?? "--"}</span>
            </time>
          </div>
        </div>
      </section>
    </div>
  );
}
