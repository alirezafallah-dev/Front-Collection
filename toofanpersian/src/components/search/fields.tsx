"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as faCal from "date-fns-jalali";
import { isValid } from "date-fns-jalali";
import { differenceInCalendarDays } from "date-fns";
import {
  ArrowLeftRight,
  Calendar as CalendarIcon,
  ChevronDown,
  MapPin,
  Minus,
  Plane,
  Plus,
  Users,
} from "lucide-react";
import { createPortal } from "react-dom";
import CalendarPanel, { CalRange } from "@/components/search/CalendarPanel";
import { cn } from "@/lib/utils";
import { ALL_AIRPORTS } from "@/lib/constants/airports";

/* ═══ Date utilities ═══ */
const JALALI_FMT = "yyyy/MM/dd";

export function parseJalaliDate(s: string | undefined): Date | undefined {
  if (!s) return undefined;
  try {
    const d = faCal.parse(s, JALALI_FMT, new Date());
    return isValid(d) ? d : undefined;
  } catch { return undefined; }
}

export function formatJalaliDate(d: Date | undefined): string {
  if (!d || !isValid(d)) return "";
  return faCal.format(d, JALALI_FMT);
}

function todayStart(): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

export function todayJalali(): string {
  return formatJalaliDate(todayStart());
}

/* ═══ CityValue ═══ */
export interface CityValue {
  label: string;
  code?: string;
  sub?: string;
}

/* ═══ CityPicker ═══ */
export function CityPicker({
  value,
  onChange,
  placeholder,
  source,
}: {
  value: CityValue | null;
  onChange: (v: CityValue) => void;
  placeholder: string;
  source: "airports" | "cities";
}) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  const allItems: CityValue[] = useMemo(() => {
    if (source === "airports") {
      return ALL_AIRPORTS.map((a) => ({
        label: a.city,
        code: a.code,
        sub: a.name,
      }));
    }
    const popularCities = [
      { label: "مشهد", sub: "خراسان رضوی" },
      { label: "تهران", sub: "تهران" },
      { label: "کیش", sub: "هرمزگان" },
      { label: "شیراز", sub: "فارس" },
      { label: "اصفهان", sub: "اصفهان" },
      { label: "یزد", sub: "یزد" },
      { label: "قشم", sub: "هرمزگان" },
      { label: "تبریز", sub: "آذربایجان شرقی" },
      { label: "بندر انزلی", sub: "گیلان" },
      { label: "سرعین", sub: "اردبیل" },
      { label: "رامسر", sub: "مازندران" },
      { label: "نوشهر", sub: "مازندران" },
      { label: "چالوس", sub: "مازندران" },
      { label: "لاهیجان", sub: "گیلان" },
      { label: "رشت", sub: "گیلان" },
    ];
    return popularCities;
  }, [source]);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return allItems;
    return allItems.filter(i =>
      i.label.toLowerCase().includes(term) ||
      i.code?.toLowerCase().includes(term) ||
      i.sub?.toLowerCase().includes(term)
    );
  }, [q, allItems]);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  return (
    <div ref={ref} className="relative w-full">
      <input
        className="w-full bg-transparent text-sm font-bold text-slate-900 outline-none placeholder:text-slate-400 placeholder:font-normal"
        placeholder={placeholder}
        value={open ? q : value?.label || ""}
        onFocus={() => { setOpen(true); setQ(""); }}
        onChange={(e) => { setQ(e.target.value); setOpen(true); }}
      />
      {open && (
        <ul className="absolute top-full right-0 left-0 mt-2 bg-white rounded-xl border border-slate-200 shadow-xl overflow-hidden z-50 max-h-64 overflow-y-auto">
          {filtered.length === 0 ? (
            <li className="px-4 py-3 text-sm text-slate-400 text-center">نتیجه‌ای یافت نشد</li>
          ) : (
            filtered.map((o, i) => (
              <li key={i}>
                <button
                  type="button"
                  onClick={() => { onChange(o); setOpen(false); setQ(""); }}
                  className="w-full text-right px-4 py-3 text-sm hover:bg-brand-50 transition flex items-center gap-3"
                >
                  <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-slate-900 truncate">{o.label}</div>
                    {o.sub && <div className="text-xs text-slate-400">{o.sub}</div>}
                  </div>
                  {o.code && (
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                      {o.code}
                    </span>
                  )}
                </button>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}

/* ═══ DateRangePicker - با React Portal ═══ */
export interface DateRangeValue {
  from?: string;
  to?: string;
}

export function DateRangePicker({
  value,
  onChange,
  allowRange = true,
  fromName = "رفت",
  toName = "برگشت",
}: {
  value: DateRangeValue;
  onChange: (v: DateRangeValue) => void;
  allowRange?: boolean;
  fromName?: string;
  toName?: string;
}) {
  const [open, setOpen] = useState(false);
  const [session, setSession] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [pos, setPos] = useState<{ top: number; left: number; width: number } | null>(null);

  const ref = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // محاسبه موقعیت پنل
  useEffect(() => {
    if (!open) {
      setPos(null);
      return;
    }

    const update = () => {
      const container = ref.current;
      if (!container) return;
      const cRect = container.getBoundingClientRect();

      const isDesktop = window.innerWidth >= 768;
      const panelWidth = isDesktop ? 620 : 320;
      const panelHeight = isDesktop ? 460 : 440;
      const margin = 8;
      const vh = window.innerHeight;
      const vw = window.innerWidth;

      // اگر پایین جا نیست، بالای فیلد باز شو
      const openBelow = cRect.bottom + panelHeight + margin < vh;
      const top = openBelow
        ? cRect.bottom + margin
        : Math.max(margin, cRect.top - panelHeight - margin);

      // وسط‌چین فیلد + clamp به viewport
      const idealLeft = cRect.left + cRect.width / 2 - panelWidth / 2;
      const left = Math.max(margin, Math.min(idealLeft, vw - margin - panelWidth));

      setPos({ top, left, width: panelWidth });
    };

    const raf = requestAnimationFrame(update);
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
    };
  }, [open, session]);

  // بستن با کلیک بیرون
  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      const target = e.target as Node;
      if (ref.current?.contains(target)) return;
      if (panelRef.current?.contains(target)) return;
      setOpen(false);
    };
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", esc);
    };
  }, [open]);

  const openPopup = useCallback(() => {
    setSession((s) => s + 1);
    setOpen(true);
  }, []);

  const liveUpdate = useCallback(
    (r: CalRange) => {
      onChange({
        from: r.from ? formatJalaliDate(r.from) : undefined,
        to: r.to ? formatJalaliDate(r.to) : undefined,
      });
    },
    [onChange]
  );

  const confirm = useCallback(() => setOpen(false), []);

  return (
    <div ref={ref} className="relative w-full">
      <div className="flex gap-2">
        {/* تاریخ رفت */}
        <div className="flex-1 min-w-0">
          <button
            type="button"
            onClick={openPopup}
            className="w-full h-14 px-4 rounded-xl border border-slate-200 hover:border-brand-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition-all flex items-center bg-slate-50/50 text-right"
          >
            <CalendarIcon className="w-5 h-5 text-brand-500 ml-3 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="text-[10px] text-slate-400 font-medium">{fromName}</div>
              <div className={cn(
                "text-sm font-bold truncate",
                value.from ? "text-slate-900" : "text-slate-400"
              )}>
                {value.from || "انتخاب کنید"}
              </div>
            </div>
          </button>
        </div>

        {/* تاریخ برگشت */}
        {allowRange && (
          <div className="flex-1 min-w-0">
            <button
              type="button"
              onClick={openPopup}
              className="w-full h-14 px-4 rounded-xl border border-slate-200 hover:border-brand-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition-all flex items-center bg-slate-50/50 text-right"
            >
              <CalendarIcon className="w-5 h-5 text-brand-500 ml-3 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-[10px] text-slate-400 font-medium">{toName}</div>
                <div className={cn(
                  "text-sm font-bold truncate",
                  value.to ? "text-slate-900" : "text-slate-400"
                )}>
                  {value.to || "انتخاب کنید"}
                </div>
              </div>
            </button>
          </div>
        )}
      </div>

      {/* Portal: پنل تقویم روی body رندر می‌شود */}
      {open && pos && mounted && createPortal(
        <div
          ref={panelRef}
          style={{
            position: "fixed",
            top: pos.top,
            left: pos.left,
            width: pos.width,
            maxWidth: "calc(100vw - 16px)",
            zIndex: 9999,
          }}
          className="bg-white rounded-2xl border border-slate-200 shadow-2xl p-6"
          onMouseDown={(e) => e.stopPropagation()}
        >
          <CalendarPanel
            key={session}
            mode={allowRange ? "range" : "single"}
            initial={{
              from: parseJalaliDate(value.from) ?? null,
              to: parseJalaliDate(value.to) ?? null,
            }}
            fromName={fromName}
            toName={toName}
            onLiveChange={liveUpdate}
            onConfirm={confirm}
          />
        </div>,
        document.body
      )}
    </div>
  );
}

/* ═══ PassengerPicker ═══ */
export function PassengerPicker({
  adults,
  children: kids,
  infants,
  onChange,
}: {
  adults: number;
  children: number;
  infants: number;
  onChange: (a: number, c: number, i: number) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  const total = adults + kids + infants;

  const Counter = ({
    label,
    sub,
    value,
    min,
    max,
    set,
  }: {
    label: string;
    sub: string;
    value: number;
    min: number;
    max: number;
    set: (v: number) => void;
  }) => (
    <div className="flex items-center justify-between py-2.5">
      <div>
        <div className="text-sm font-bold text-slate-900">{label}</div>
        <div className="text-[10px] text-slate-400">{sub}</div>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          disabled={value <= min}
          onClick={() => set(value - 1)}
          className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 disabled:opacity-30 hover:border-brand-400 hover:text-brand-600 transition"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>
        <span className="w-6 text-center font-bold text-slate-900">
          {value.toLocaleString("fa-IR")}
        </span>
        <button
          type="button"
          disabled={value >= max}
          onClick={() => set(value + 1)}
          className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:border-brand-400 hover:text-brand-600 transition"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );

  return (
    <div ref={ref} className="relative w-full">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full h-full flex items-center justify-between gap-2 cursor-pointer text-right"
      >
        <span className="flex items-center gap-2 text-sm font-bold text-slate-900">
          <Users className="w-5 h-5 text-brand-500" />
          {total.toLocaleString("fa-IR")} مسافر
        </span>
        <ChevronDown
          className={cn(
            "w-4 h-4 text-slate-400 transition-transform",
            open && "rotate-180"
          )}
        />
      </button>
      {open && (
        <div className="absolute top-full right-0 mt-3 w-72 bg-white rounded-2xl border border-slate-200 shadow-xl p-4 z-50">
          <Counter
            label="بزرگسال"
            sub="۱۲ سال به بالا"
            value={adults}
            min={1}
            max={9}
            set={(v) => onChange(v, kids, infants)}
          />
          <div className="h-px bg-slate-100 my-1" />
          <Counter
            label="کودک"
            sub="۲ تا ۱۲ سال"
            value={kids}
            min={0}
            max={6}
            set={(v) => onChange(adults, v, infants)}
          />
          <div className="h-px bg-slate-100 my-1" />
          <Counter
            label="نوزاد"
            sub="زیر ۲ سال"
            value={infants}
            min={0}
            max={3}
            set={(v) => onChange(adults, kids, v)}
          />
        </div>
      )}
    </div>
  );
}

/* ═══ SwapButton ═══ */
export function SwapButton({ onSwap }: { onSwap: () => void }) {
  return (
    <button
      type="button"
      onClick={onSwap}
      aria-label="جابجایی مبدا و مقصد"
      className="self-center w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:border-brand-400 hover:text-brand-500 hover:rotate-180 transition-all duration-300 cursor-pointer flex-shrink-0"
    >
      <ArrowLeftRight className="w-4 h-4" />
    </button>
  );
}

/* ═══ calcNights ═══ */
export function calcNights(from?: string, to?: string): number | null {
  if (!from || !to) return null;
  const f = parseJalaliDate(from);
  const t = parseJalaliDate(to);
  if (!f || !t) return null;
  const diff = differenceInCalendarDays(t, f);
  return diff > 0 ? diff : null;
}