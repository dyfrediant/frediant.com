"use client";

import { useEffect, useState } from "react";

export function LocalTime({ timeZone = "Asia/Jakarta" }: { timeZone?: string }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone,
      }).format(new Date());

    const tick = () => setTime(format());
    const frame = window.requestAnimationFrame(tick);
    const timer = window.setInterval(tick, 30_000);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearInterval(timer);
    };
  }, [timeZone]);

  return (
    <span className="tabular-nums" suppressHydrationWarning>
      {time || "--:--"}
    </span>
  );
}
