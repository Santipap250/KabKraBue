"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";
import styles from "./CelestialTimepiece.module.css";
import { getCelestialClockSnapshot, type CelestialClockSnapshot } from "@/lib/celestial-time";

const STAR_FIELD = Array.from({ length: 28 }, (_, index) => ({
  id: index,
  x: (index * 37 + 11) % 97,
  y: (index * 61 + 7) % 91,
  size: index % 9 === 0 ? 2 : index % 3 === 0 ? 1.5 : 1,
  delay: `${(index % 13) * -0.47}s`,
  duration: `${3.2 + (index % 6) * 0.85}s`,
}));

const COUNTDOWN_UNITS = [
  { key: "days", thai: "วัน", english: "DAYS" },
  { key: "hours", thai: "ชั่วโมง", english: "HOURS" },
  { key: "minutes", thai: "นาที", english: "MINUTES" },
  { key: "seconds", thai: "วินาที", english: "SECONDS" },
] as const;

type CelestialTimepieceProps = {
  /** The Hero owns this decision, including reduced motion and data-saver checks. */
  motionEnabled: boolean;
};

function useBangkokClock(active: boolean): CelestialClockSnapshot | null {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    if (!active) return;

    let timer: number | undefined;
    const clearTimer = () => {
      if (timer !== undefined) window.clearTimeout(timer);
      timer = undefined;
    };
    const tick = () => {
      clearTimer();
      if (document.visibilityState !== "visible") return;
      const current = new Date();
      setNow(current);
      timer = window.setTimeout(tick, 1_000 - current.getMilliseconds());
    };
    const handleVisibilityChange = () => {
      clearTimer();
      if (document.visibilityState === "visible") tick();
    };

    tick();
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      clearTimer();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [active]);

  return now ? getCelestialClockSnapshot(now) : null;
}

export function CelestialTimepiece({ motionEnabled }: CelestialTimepieceProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const resetTimer = useRef<number | null>(null);
  const [inViewport, setInViewport] = useState(true);
  const [pageVisible, setPageVisible] = useState(true);
  const [awakened, setAwakened] = useState(false);
  const clockActive = inViewport && pageVisible;
  const snapshot = useBangkokClock(clockActive);
  const motionActive = motionEnabled && clockActive;

  useEffect(() => {
    const target = rootRef.current;
    if (!target) return;
    if (typeof IntersectionObserver === "undefined") {
      setInViewport(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      setInViewport(Boolean(entry?.isIntersecting));
    }, { threshold: 0.01 });
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const syncVisibility = () => setPageVisible(document.visibilityState === "visible");
    syncVisibility();
    document.addEventListener("visibilitychange", syncVisibility);
    return () => document.removeEventListener("visibilitychange", syncVisibility);
  }, []);

  useEffect(() => () => {
    if (resetTimer.current !== null) window.clearTimeout(resetTimer.current);
  }, []);

  const wakeStars = () => {
    if (!motionEnabled) return;
    setAwakened(true);
    if (resetTimer.current !== null) window.clearTimeout(resetTimer.current);
    resetTimer.current = window.setTimeout(() => {
      setAwakened(false);
      resetTimer.current = null;
    }, 1_900);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!motionEnabled || event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / Math.max(bounds.width, 1) - 0.5;
    const y = (event.clientY - bounds.top) / Math.max(bounds.height, 1) - 0.5;
    event.currentTarget.style.setProperty("--pointer-x", `${x * 7}px`);
    event.currentTarget.style.setProperty("--pointer-y", `${y * 4}px`);
    event.currentTarget.style.setProperty("--orbit-pointer-x", `${x * -1.25}px`);
    event.currentTarget.style.setProperty("--orbit-pointer-y", `${y * -0.7}px`);
  };

  const resetPointer = (event: ReactPointerEvent<HTMLDivElement>) => {
    event.currentTarget.style.setProperty("--pointer-x", "0px");
    event.currentTarget.style.setProperty("--pointer-y", "0px");
    event.currentTarget.style.setProperty("--orbit-pointer-x", "0px");
    event.currentTarget.style.setProperty("--orbit-pointer-y", "0px");
  };

  const targetYear = snapshot?.targetYear;
  const dateTime = snapshot?.instantIso;

  return (
    <div className={styles.positioner}>
      <div
        ref={rootRef}
        data-clock-root
        data-motion={motionEnabled ? "on" : "off"}
        data-active={motionActive ? "true" : "false"}
        data-awake={awakened ? "true" : "false"}
        data-finale={snapshot?.isFinalMinute ? "true" : "false"}
        data-celebration={snapshot?.isMidnightFinale ? "true" : "false"}
        className={`${styles.timepiece} ${awakened && motionActive ? styles.awakened : ""}`.trim()}
        role="group"
        aria-label="นาฬิกาดาราศาสตร์ KabKraBue · Celestial time in Thailand"
        onPointerMove={handlePointerMove}
        onPointerLeave={resetPointer}
      >
        <span className={styles.ambient} aria-hidden="true" />
        <span className={styles.starField} aria-hidden="true">
          {STAR_FIELD.map((star) => {
            const starStyle = {
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: star.delay,
              animationDuration: star.duration,
            } as CSSProperties;
            return <span key={star.id} className={styles.star} style={starStyle} />;
          })}
        </span>
        <svg className={styles.orbitSvg} viewBox="0 0 440 220" preserveAspectRatio="none" aria-hidden="true">
          <g className={styles.orbitSlow}>
            <ellipse cx="220" cy="110" rx="206" ry="73" fill="none" stroke="#d9ad63" strokeWidth="1" opacity=".32" />
            <circle cx="14" cy="110" r="2.5" fill="#f4d89a" />
          </g>
          <g className={styles.orbitReverse}>
            <ellipse cx="220" cy="110" rx="149" ry="101" transform="rotate(-27 220 110)" fill="none" stroke="#89bce6" strokeWidth=".8" strokeDasharray="2 6" opacity=".3" />
            <circle cx="104" cy="35" r="2" fill="#a9d6f6" />
          </g>
          <g className={styles.orbitTilt}>
            <ellipse cx="220" cy="110" rx="181" ry="51" transform="rotate(16 220 110)" fill="none" stroke="#d8bd83" strokeWidth=".7" strokeDasharray="1 8" opacity=".28" />
            <circle cx="354" cy="69" r="1.8" fill="#ffe6ad" />
          </g>
        </svg>
        <span className={styles.shootingStar} aria-hidden="true" />
        <span className={styles.pulse} aria-hidden="true" />

        <div className={styles.content}>
          <div className={styles.topline}>
            <span className={styles.eyebrow}>
              <span className={styles.liveDot} aria-hidden="true" />
              {snapshot?.isMidnightFinale ? (
                <span lang="en">HAPPY NEW YEAR · <span lang="th">สวัสดีปีใหม่</span></span>
              ) : (
                <span lang="en">CELESTIAL TIMEPIECE</span>
              )}
            </span>
            <span className={styles.targetYear} data-clock-target>
              <span lang="th">ปีใหม่ พ.ศ. {snapshot?.targetBuddhistYear ?? "—"}</span>
              <b lang="en">{targetYear ?? "—"}</b>
            </span>
          </div>

          <div className={styles.timeBlock}>
            <time className={styles.digitalTime} data-clock-timer dateTime={dateTime} role="timer" aria-live="off" aria-label="เวลาปัจจุบันในประเทศไทย · Current time in Thailand">
              <span>{snapshot?.hour ?? "––"}</span><i aria-hidden="true">:</i><span>{snapshot?.minute ?? "––"}</span><i aria-hidden="true">:</i><span className={styles.seconds}>{snapshot?.second ?? "––"}</span>
            </time>
            <span className={styles.zone}><span lang="th">เวลาไทย</span><b aria-hidden="true">·</b><span lang="en">BANGKOK TIME</span><i>UTC+7</i></span>
          </div>

          <div className={styles.dateBlock}>
            <time data-clock-date-thai dateTime={dateTime}>{snapshot?.thaiDate ?? "กำลังซิงก์เวลาไทย"}</time>
            <span data-clock-date-en lang="en">{snapshot?.englishDate ?? "SYNCING THAILAND TIME"}</span>
          </div>

          <div className={styles.countdown} role="group" aria-label="นับถอยหลังสู่ปีใหม่ · Countdown to New Year">
            {COUNTDOWN_UNITS.map((unit) => {
              const value = snapshot?.[unit.key];
              return (
                <div className={styles.unit} key={unit.key}>
                  <b key={value ?? "loading"} className={`${styles.unitValue} ${unit.key === "days" && (value ?? 0) > 99 ? styles.unitValueLong : ""}`}>{value === undefined ? "––" : String(value).padStart(2, "0")}</b>
                  <span lang="th">{unit.thai}</span>
                  <i lang="en">{unit.english}</i>
                </div>
              );
            })}
          </div>

          <div className={styles.bottomLine}>
            <div className={styles.progressInfo}>
              <div className={styles.progressCaption} data-clock-progress>
                <span lang="th">เส้นทางปี {snapshot?.currentYear ?? "—"}</span>
                <span lang="en">YEAR {snapshot?.currentYear ?? "—"}</span>
                <b>{snapshot ? `${snapshot.progress.toFixed(1)}%` : "—"}</b>
              </div>
              <div className={styles.progressTrack} role="progressbar" aria-label="ความคืบหน้าของปีปัจจุบัน · Current year progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={snapshot ? Number(snapshot.progress.toFixed(1)) : undefined} aria-valuetext={snapshot ? `${snapshot.progress.toFixed(1)}%` : undefined}>
                <span style={{ transform: `scaleX(${(snapshot?.progress ?? 0) / 100})` }} />
              </div>
            </div>
            {motionEnabled && (
              <button type="button" className={styles.awakenButton} onClick={wakeStars} aria-label="ปลุกแสงดาวและวงโคจร · Awaken the stars and orbits" title="ปลุกแสงดาว · Awaken the stars">
                <span aria-hidden="true">✧</span>
              </button>
            )}
          </div>
        </div>
        <span className={styles.lightSweep} aria-hidden="true" />
      </div>
    </div>
  );
}
