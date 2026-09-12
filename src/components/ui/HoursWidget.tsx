"use client";

import { useState, useEffect } from "react";

const weeklyHours = [
  { day: "Monday", open: "9:00 AM", close: "4:00 PM", closed: false },
  { day: "Tuesday", open: "9:00 AM", close: "4:00 PM", closed: false },
  { day: "Wednesday", open: "9:00 AM", close: "4:00 PM", closed: false },
  { day: "Thursday", open: "9:00 AM", close: "4:00 PM", closed: false },
  { day: "Friday", open: "9:00 AM", close: "4:00 PM", closed: false },
  { day: "Saturday", open: "9:00 AM", close: "1:00 PM", closed: false },
  { day: "Sunday", open: "", close: "", closed: true },
];

export default function HoursWidget({
  className = "",
  showFull = false,
}: {
  className?: string;
  showFull?: boolean;
}) {
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const [isOpenNow, setIsOpenNow] = useState(false);

  useEffect(() => {
    const now = new Date();
    const dayIndex = now.getDay(); // 0 = Sunday
    const adjustedIndex = dayIndex === 0 ? 6 : dayIndex - 1; // Convert to Monday=0
    setCurrentDayIndex(adjustedIndex);

    const hours = weeklyHours[adjustedIndex];
    if (!hours.closed) {
      const [openHour, openMin] = hours.open.match(/(\d+):(\d+)\s*(AM|PM)/)!.slice(1, 3).map(Number);
      const [closeHour, closeMin] = hours.close.match(/(\d+):(\d+)\s*(AM|PM)/)!.slice(1, 3).map(Number);
      const openPeriod = hours.open.includes("PM") ? 12 : 0;
      const closePeriod = hours.close.includes("PM") ? 12 : 0;
      
      const openTime = (openHour % 12) + openPeriod;
      const closeTime = (closeHour % 12) + closePeriod;
      const currentHour = now.getHours();
      
      setIsOpenNow(currentHour >= openTime && currentHour < closeTime);
    } else {
      setIsOpenNow(false);
    }
  }, []);

  const today = weeklyHours[currentDayIndex];

  if (showFull) {
    return (
      <div className={`glass-card rounded-2xl p-6 ${className}`}>
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Weekly Schedule
        </h3>
        <div className="space-y-3" role="list" aria-label="Weekly opening hours">
          {weeklyHours.map((day, index) => (
            <div
              key={day.day}
              className={`flex items-center justify-between px-4 py-3 rounded-xl transition-colors ${
                index === currentDayIndex
                  ? "bg-primary/10 border border-primary/20"
                  : "bg-background/50 hover:bg-primary/5"
              }`}
              role="listitem"
              aria-current={index === currentDayIndex ? "date" : undefined}
            >
              <span className={`font-medium ${index === currentDayIndex ? "text-primary" : "text-foreground"}`}>
                {day.day}
                {index === currentDayIndex && (
                  <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-primary text-white">
                    Today
                  </span>
                )}
              </span>
              <span className={day.closed ? "text-foreground/40" : "text-foreground"}>
                {day.closed ? "Closed" : `${day.open} - ${day.close}`}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4 p-4 rounded-xl bg-primary/10 border border-primary/20">
          <div className="flex items-center gap-3">
            <div
              className={`w-3 h-3 rounded-full ${isOpenNow ? "bg-primary" : "bg-foreground/30"}`}
              aria-hidden="true"
            />
            <div>
              <p className="font-semibold text-primary">{isOpenNow ? "Open Now" : "Closed"}</p>
              <p className="text-sm text-foreground/70">
                {isOpenNow
                  ? `Closes at ${today.close}`
                  : today.closed
                  ? "Opens Monday at 9:00 AM"
                  : `Opens tomorrow at 9:00 AM`}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`inline-flex items-center gap-3 px-4 py-3 rounded-xl glass-card ${className}`}
      role="status"
      aria-live="polite"
    >
      <div
        className={`w-2.5 h-2.5 rounded-full animate-pulse ${isOpenNow ? "bg-primary" : "bg-foreground/30"}`}
        aria-hidden="true"
      />
      <div className="text-left">
        <p className="text-sm font-semibold text-foreground">
          {isOpenNow ? "Open Now" : "Closed"}
        </p>
        <p className="text-xs text-foreground/60">
          {isOpenNow
            ? `Closes at ${today.close}`
            : today.closed
            ? "Opens Mon 9:00 AM"
            : `Opens tomorrow 9:00 AM`}
        </p>
      </div>
    </div>
  );
}