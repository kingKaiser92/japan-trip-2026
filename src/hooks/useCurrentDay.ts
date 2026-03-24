"use client";

import { useState, useEffect } from "react";
import { getCurrentDayNumber } from "@/lib/dates";

export function useCurrentDay() {
  const [dayNumber, setDayNumber] = useState<number | null>(null);

  useEffect(() => {
    setDayNumber(getCurrentDayNumber());
  }, []);

  return dayNumber;
}
