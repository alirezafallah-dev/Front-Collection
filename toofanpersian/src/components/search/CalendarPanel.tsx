"use client";
import { useMemo, useState } from "react";
import * as faCal from "date-fns-jalali";
import * as enCal from "date-fns";
import { faIR } from "date-fns-jalali/locale";
import { ChevronLeft, ChevronRight, Calendar as CalIcon } from "lucide-react";

export interface CalRange {
  from: Date | null;
  to: Date | null;
}

const WD_FA = ["ش", "ی", "د", "س", "چ", "پ", "ج"];
const WD_EN = ["S", "M", "T", "W", "T", "F", "S"];
const faNum = (n: number) => n.toLocaleString("fa-IR");

function monthCells(m: Date, cal: typeof faCal | typeof enCal, satStart: boolean): (Date | null)[] {
  const start = cal.startOfMonth(m);
  const count = cal.getDate(cal.endOfMonth(m));
  const offset = satStart ? (cal.getDay(start) + 1) % 7 : cal.getDay(start);
  const cells: (Date | null)[] = Array.from({ length: offset }, () => null);
  for (let d = 1; d <= count; d++) cells.push(cal.setDate(start, d));
  return cells;
}

interface Props {
  mode: "range" | "single";
  initial: CalRange;
  fromName: string;
  toName: string;
  onLiveChange?: (r: CalRange) => void;
  onConfirm: () => void;
  minDate?: Date | null;
  maxDate?: Date | null;
  initialView?: Date | null;
}

export default function CalendarPanel({
  mode,
  initial,
  fromName,
  toName,
  onLiveChange,
  onConfirm,
  minDate,
  maxDate,
  initialView,
}: Props) {
  const [calendar, setCalendar] = useState<"fa" | "en">("fa");
  const [pending, setPending] = useState<CalRange>(initial);
  const [hover, setHover] = useState<Date | null>(null);
  const cal: typeof faCal | typeof enCal = calendar === "fa" ? faCal : enCal;

  const today = useMemo(() => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return t;
  }, []);

  const effMin = minDate ?? today;
  const effMax = maxDate ?? null;

  const [viewMonth, setViewMonth] = useState<Date>(() =>
    faCal.startOfMonth(initialView ?? initial.from ?? effMax ?? new Date())
  );

  const atMinMonth = viewMonth.getTime() <= cal.startOfMonth(effMin).getTime();
  const atMaxMonth = effMax
    ? viewMonth.getTime() >= cal.startOfMonth(effMax).getTime()
    : false;

  const switchCalendar = (c: "fa" | "en") => {
    setCalendar(c);
    const nc = c === "fa" ? faCal : enCal;
    setViewMonth(nc.startOfMonth(viewMonth));
  };

  const goToday = () =>
    setViewMonth(
      cal.startOfMonth(
        effMax && today.getTime() > effMax.getTime() ? effMax : today
      )
    );

  const pick = (day: Date) => {
    let next: CalRange;
    if (mode === "single") {
      next = { from: day, to: null };
    } else if (!pending.from || (pending.from && pending.to)) {
      next = { from: day, to: null };
    } else if (day.getTime() < pending.from.getTime()) {
      next = { from: day, to: null };
    } else {
      next = { from: pending.from, to: day };
    }
    setPending(next);
    onLiveChange?.(next);
  };

  const preview: CalRange = useMemo(() => {
    if (mode !== "range" || !pending.from || pending.to || !hover)
      return pending;
    if (hover.getTime() < pending.from.getTime())
      return { from: hover, to: pending.from };
    return { from: pending.from, to: hover };
  }, [pending, hover, mode]);

  const nights =
    pending.from && pending.to
      ? enCal.differenceInCalendarDays(pending.to, pending.from)
      : 0;

  const canConfirm = mode === "single" ? !!pending.from : !!pending.from && !!pending.to;

  const fmtStatus = (d: Date) =>
    calendar === "fa"
      ? faCal.format(d, "d MMMM", { locale: faIR })
      : enCal.format(d, "d MMMM");

  const months = [viewMonth, cal.addMonths(viewMonth, 1)];

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
        <button
          type="button"
          onClick={goToday}
          className="text-xs font-bold text-brand-600 hover:text-brand-700 transition flex items-center gap-1.5"
        >
          <CalIcon className="w-3.5 h-3.5" />
          برو به امروز
        </button>
        <button
          type="button"
          onClick={() => switchCalendar(calendar === "fa" ? "en" : "fa")}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-brand-600 transition"
        >
          {calendar === "fa" ? "🌍 تقویم میلادی" : "🇮🇷 تقویم شمسی"}
        </button>
      </div>

      {/* Months navigation */}
      <div className="relative mb-4">
        <button
          type="button"
          onClick={() => setViewMonth(cal.addMonths(viewMonth, -1))}
          disabled={atMinMonth}
          className={`absolute top-2 right-0 w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:bg-brand-50 hover:text-brand-600 transition z-10 ${
            atMinMonth ? "invisible" : ""
          }`}
        >
          <ChevronRight className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => setViewMonth(cal.addMonths(viewMonth, 1))}
          disabled={atMaxMonth}
          className={`absolute top-2 left-0 w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:bg-brand-50 hover:text-brand-600 transition z-10 ${
            atMaxMonth ? "invisible" : ""
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {months.map((m, mi) => (
          <div key={mi} className={mi === 1 ? "hidden md:block" : ""}>
            <div className="text-center font-bold text-sm text-slate-900 mb-3 h-8 flex items-center justify-center">
              {calendar === "fa"
                ? faCal.format(m, "MMMM yyyy", { locale: faIR })
                : enCal.format(m, "MMMM yyyy")}
            </div>
            <div className="grid grid-cols-7">
              {(calendar === "fa" ? WD_FA : WD_EN).map((w, i) => (
                <div
                  key={i}
                  className="h-8 flex items-center justify-center text-[11px] font-bold text-slate-400"
                >
                  {w}
                </div>
              ))}
              {monthCells(m, cal, calendar === "fa").map((d, i) => {
                if (!d) return <div key={`b${i}`} className="h-10" />;
                const t = d.getTime();
                const isDisabled =
                  t < effMin.getTime() ||
                  (effMax ? t > effMax.getTime() : false);
                const isToday = t === today.getTime();
                const isStart = !!preview.from && t === preview.from.getTime();
                const isEnd = !!preview.to && t === preview.to.getTime();
                const inRange =
                  !!preview.from &&
                  !!preview.to &&
                  t > preview.from.getTime() &&
                  t < preview.to.getTime();

                let wrap = "";
                if (inRange) {
                  wrap = "bg-brand-50";
                } else if (isStart && preview.to) {
                  wrap = "bg-gradient-to-l from-transparent from-50% to-brand-50 to-50%";
                } else if (isEnd) {
                  wrap = "bg-gradient-to-r from-transparent from-50% to-brand-50 to-50%";
                }

                let btn =
                  "w-10 h-10 flex items-center justify-center rounded-full text-sm transition-all cursor-pointer hover:bg-brand-500 hover:text-white";
                if (isDisabled) {
                  btn =
                    "w-10 h-10 flex items-center justify-center rounded-full text-sm opacity-30 line-through text-slate-400 cursor-not-allowed";
                } else if (isStart || isEnd) {
                  btn =
                    "w-10 h-10 flex items-center justify-center rounded-full text-sm bg-brand-500 text-white font-bold shadow-lg shadow-brand-500/30 cursor-pointer";
                } else if (isToday) {
                  btn =
                    "w-10 h-10 flex items-center justify-center rounded-full text-sm border-2 border-brand-500 text-brand-600 font-bold cursor-pointer";
                }

                return (
                  <div
                    key={i}
                    className={`h-10 flex items-center justify-center ${wrap}`}
                    onMouseEnter={() => setHover(d)}
                    onMouseLeave={() => setHover(null)}
                  >
                    <button
                      type="button"
                      disabled={isDisabled}
                      onClick={() => pick(d)}
                      className={btn}
                    >
                      {calendar === "fa"
                        ? faNum(cal.getDate(d))
                        : cal.getDate(d)}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between gap-3 mt-6 pt-4 border-t border-slate-100">
        <div className="flex items-center gap-4 text-sm">
          <div>
            <span className="text-slate-400 font-medium">{fromName}:</span>{" "}
            <span className="text-slate-900 font-bold">
              {pending.from ? fmtStatus(pending.from) : "انتخاب کنید"}
            </span>
          </div>
          {mode === "range" && (
            <>
              <span className="text-slate-300">|</span>
              <div>
                <span className="text-slate-400 font-medium">{toName}:</span>{" "}
                <span className="text-slate-900 font-bold">
                  {pending.to ? fmtStatus(pending.to) : "-"}
                </span>
              </div>
              {nights > 0 && (
                <>
                  <span className="text-slate-300">|</span>
                  <span className="text-brand-600 font-bold">
                    {calendar === "fa" ? faNum(nights) : nights} شب
                  </span>
                </>
              )}
            </>
          )}
        </div>
        <button
          type="button"
          disabled={!canConfirm}
          onClick={onConfirm}
          className="px-6 py-2.5 rounded-full bg-brand-500 text-white text-sm font-bold hover:bg-brand-600 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-brand-500/20"
        >
          تایید
        </button>
      </div>
    </div>
  );
}