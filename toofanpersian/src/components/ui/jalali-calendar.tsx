"use client";

import { useState, useMemo, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

// تبدیل میلادی به شمسی
function gregorianToJalali(gy: number, gm: number, gd: number) {
  const g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
  let jy = gy <= 1600 ? 0 : 979;
  gy -= gy <= 1600 ? 621 : 1600;
  const gy2 = gm > 2 ? gy + 1 : gy;
  let days =
    365 * gy +
    Math.floor((gy2 + 3) / 4) -
    Math.floor((gy2 + 99) / 100) +
    Math.floor((gy2 + 399) / 400) -
    80 +
    gd +
    g_d_m[gm - 1];
  jy += 33 * Math.floor(days / 12053);
  days %= 12053;
  jy += 4 * Math.floor(days / 1461);
  days %= 1461;
  if (days > 365) {
    jy += Math.floor((days - 1) / 365);
    days = (days - 1) % 365;
  }
  const jm = days < 186 ? 1 + Math.floor(days / 31) : 7 + Math.floor((days - 186) / 30);
  const jd = 1 + (days < 186 ? days % 31 : (days - 186) % 30);
  return { jy, jm, jd };
}

// تبدیل شمسی به میلادی
function jalaliToGregorian(jy: number, jm: number, jd: number) {
  let gy = jy <= 979 ? 621 : 1600;
  jy -= jy <= 979 ? 0 : 979;
  let days =
    365 * jy +
    Math.floor(jy / 33) * 8 +
    Math.floor(((jy % 33) + 3) / 4) +
    78 +
    jd +
    (jm < 7 ? (jm - 1) * 31 : (jm - 7) * 30 + 186);
  gy += 400 * Math.floor(days / 146097);
  days %= 146097;
  if (days > 36524) {
    gy += 100 * Math.floor(--days / 36524);
    days %= 36524;
    if (days >= 365) days++;
  }
  gy += 4 * Math.floor(days / 1461);
  days %= 1461;
  if (days > 365) {
    gy += Math.floor((days - 1) / 365);
    days = (days - 1) % 365;
  }
  let gd = days + 1;
  const sal_a = [
    0, 31, (gy % 4 === 0 && gy % 100 !== 0) || gy % 400 === 0 ? 29 : 28,
    31, 30, 31, 30, 31, 31, 30, 31, 30, 31,
  ];
  let gm = 0;
  for (gm = 0; gm < 13 && gd > sal_a[gm]; gm++) gd -= sal_a[gm];
  return { gy, gm, jd: gd };
}

function isJalaliLeap(jy: number) {
  const leapYears = [1, 5, 9, 13, 17, 22, 26, 30];
  return leapYears.includes(jy % 33);
}

function getJalaliDaysInMonth(jy: number, jm: number) {
  if (jm <= 6) return 31;
  if (jm <= 11) return 30;
  return isJalaliLeap(jy) ? 30 : 29;
}

function getFirstDayOfMonth(jy: number, jm: number) {
  const { gy, gm, jd } = jalaliToGregorian(jy, jm, 1);
  const date = new Date(gy, gm - 1, jd);
  return (date.getDay() + 1) % 7; // شنبه = 0
}

const PERSIAN_MONTHS = [
  "فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور",
  "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند",
];

const PERSIAN_WEEKDAYS = ["ش", "ی", "د", "س", "چ", "پ", "ج"];

const PERSIAN_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

function toPersianNum(n: number | string) {
  return String(n).replace(/[0-9]/g, (d) => PERSIAN_DIGITS[parseInt(d)]);
}

export type JalaliDate = {
  year: number;
  month: number;
  day: number;
};

type Props = {
  value: JalaliDate | null;
  onChange: (date: JalaliDate | null) => void;
  minDate?: JalaliDate;
};

export function JalaliCalendar({ value, onChange, minDate }: Props) {
  const today = useMemo(() => {
    const d = new Date();
    return gregorianToJalali(d.getFullYear(), d.getMonth() + 1, d.getDate());
  }, []);

  const [viewYear, setViewYear] = useState(value?.year ?? today.jy);
  const [viewMonth, setViewMonth] = useState(value?.month ?? today.jm);

  useEffect(() => {
    if (value) {
      setViewYear(value.year);
      setViewMonth(value.month);
    }
  }, [value]);

  const daysInMonth = getJalaliDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);

  const prevMonth = () => {
    if (viewMonth === 1) {
      setViewMonth(12);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const nextMonth = () => {
    if (viewMonth === 12) {
      setViewMonth(1);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  const isDisabled = (day: number) => {
    if (!minDate) return false;
    if (viewYear < minDate.year) return true;
    if (viewYear === minDate.year && viewMonth < minDate.month) return true;
    if (viewYear === minDate.year && viewMonth === minDate.month && day < minDate.day) return true;
    return false;
  };

  return (
    <div className="w-80 rounded-2xl border border-line bg-white p-5 shadow-card">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={nextMonth}
          className="rounded-lg p-2 transition hover:bg-surface"
        >
          <ChevronLeft className="h-5 w-5 text-navy-700" />
        </button>
        <div className="text-center">
          <div className="font-black text-navy-800">
            {PERSIAN_MONTHS[viewMonth - 1]} {toPersianNum(viewYear)}
          </div>
        </div>
        <button
          type="button"
          onClick={prevMonth}
          className="rounded-lg p-2 transition hover:bg-surface"
        >
          <ChevronRight className="h-5 w-5 text-navy-700" />
        </button>
      </div>

      {/* Weekdays Header */}
      <div className="mb-2 grid grid-cols-7 gap-1">
        {PERSIAN_WEEKDAYS.map((d) => (
          <div key={d} className="py-2 text-center text-xs font-bold text-muted">
            {d}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Empty slots for offset */}
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {/* Days */}
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
          const isSelected =
            value?.year === viewYear && value?.month === viewMonth && value?.day === day;
          const isToday =
            today.jy === viewYear && today.jm === viewMonth && today.jd === day;
          const disabled = isDisabled(day);

          return (
            <button
              key={day}
              type="button"
              disabled={disabled}
              onClick={() =>
                onChange({ year: viewYear, month: viewMonth, day })
              }
              className={cn(
                "aspect-square rounded-lg text-sm font-bold transition",
                disabled && "cursor-not-allowed text-muted/30",
                !disabled && !isSelected && "text-ink hover:bg-brand-50 hover:text-brand-600",
                isSelected && "bg-brand-500 text-white shadow-chip",
                isToday && !isSelected && "border border-brand-500 text-brand-600"
              )}
            >
              {toPersianNum(day)}
            </button>
          );
        })}
      </div>

      {/* Today Button */}
      <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
        <button
          type="button"
          onClick={() =>
            onChange({ year: today.jy, month: today.jm, day: today.jd })
          }
          className="rounded-lg bg-surface px-3 py-1.5 text-xs font-bold text-navy-700 transition hover:bg-navy-50"
        >
          امروز ({toPersianNum(today.jd)} {PERSIAN_MONTHS[today.jm - 1]})
        </button>
        {value && (
          <button
            type="button"
            onClick={() => onChange(null)}
            className="flex items-center gap-1 text-xs font-medium text-muted hover:text-danger"
          >
            <X className="h-3.5 w-3.5" /> پاک کردن
          </button>
        )}
      </div>
    </div>
  );
}