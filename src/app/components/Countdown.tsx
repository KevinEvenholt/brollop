"use client";

import { useState, useEffect } from "react";

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const weddingDate = new Date("2026-06-13T14:30:00").getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = weddingDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-center">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
        <div>
          <div
            className="text-3xl sm:text-4xl font-bold"
            style={{ color: "var(--accent)" }}
          >
            {timeLeft.days}
          </div>
          <div className="text-sm text-black/70 mt-1">
            {timeLeft.days === 1 ? "dag" : "dagar"}
          </div>
        </div>
        <div>
          <div
            className="text-3xl sm:text-4xl font-bold"
            style={{ color: "var(--accent)" }}
          >
            {timeLeft.hours}
          </div>
          <div className="text-sm text-black/70 mt-1">
            {timeLeft.hours === 1 ? "timme" : "timmar"}
          </div>
        </div>
        <div>
          <div
            className="text-3xl sm:text-4xl font-bold"
            style={{ color: "var(--accent)" }}
          >
            {timeLeft.minutes}
          </div>
          <div className="text-sm text-black/70 mt-1">
            {timeLeft.minutes === 1 ? "minut" : "minuter"}
          </div>
        </div>
        <div>
          <div
            className="text-3xl sm:text-4xl font-bold"
            style={{ color: "var(--accent)" }}
          >
            {timeLeft.seconds}
          </div>
          <div className="text-sm text-black/70 mt-1">
            {timeLeft.seconds === 1 ? "sekund" : "sekunder"}
          </div>
        </div>
      </div>
    </div>
  );
}
