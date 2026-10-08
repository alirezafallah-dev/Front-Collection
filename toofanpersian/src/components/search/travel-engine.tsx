"use client";

import { useMemo, useState } from "react";
import {
  ArrowLeftRight,
  CalendarDays,
  ChevronDown,
  Minus,
  Plane,
  PlaneLanding,
  PlaneTakeoff,
  Plus,
  Search,
  Users,
} from "lucide-react";
import { ALL_AIRPORTS } from "@/lib/constants/airports";
import { cn } from "@/lib/utils";
import { JalaliCalendar, type JalaliDate } from "@/components/ui/jalali-calendar";
import type { TripType, CabinClass } from "@/types/flight";

const PERSIAN_DIGITS = ["۰", "", "۲", "", "۴", "", "۶", "", "۸", ""];
const toPersianNum = (n: number | string) =>
  String(n).replace(/[0-9]/g, (d) => PERSIAN_DIGITS[parseInt(d)]);

const PERSIAN_MONTHS = [
  "فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور",
  "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند",
];
const formatDateJalali = (d: JalaliDate) =>
  `${toPersianNum(d.day)} ${PERSIAN_MONTHS[d.month - 1]} ${toPersianNum(d.year)}`;

const CABIN_LABELS: Record<CabinClass, string> = {
  economy: "اکونومی",
  business: "بیزینس",
  "first-class": "فرست کلاس",
};

const QUICK_ROUTES: { label: string; from: string; to: string }[] = [
  { label: "تهران ← مشهد", from: "THR", to: "MHD" },
  { label: "تهران ← کیش", from: "THR", to: "KIH" },
  { label: "تهران ← استانبول", from: "IKA", to: "IST" },
  { label: "تهران ← دبی", from: "IKA", to: "DXB" },
  { label: "مشهد ← تهران", from: "MHD", to: "THR" },
];

/* ---------- فیلد انتخاب فرودگاه ---------- */
function AirportInput({
  value,
  exclude,
  onSelect,
}: {
  value: string;
  exclude?: string;
  onSelect: (code: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const selected = ALL_AIRPORTS.find((a) => a.code === value);

  const list = useMemo(
    () =>
      ALL_AIRPORTS.filter(
        (a) =>
          `${a.city} ${a.name} ${a.code}`.toLowerCase().includes(query.toLowerCase()) &&
          a.code !== exclude
      ),
    [query, exclude]
  );

  return (
    <div className="relative">
      <input
        type="text"
        value={open ? query : selected ? `${selected.city} (${selected.code})` : ""}
        onFocus={() => {
          setOpen(true);
          setQuery("");
        }}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="شهر یا فرودگاه"
        className="w-full bg-transparent text-sm font-black text-navy-950 outline-none placeholder:font-normal placeholder:text-muted/50"
      />
      {open && (
        <ul className="absolute right-0 z-40 mt-3 max-h-64 w-72 overflow-auto rounded-xl border border-line bg-white p-1.5 shadow-search">
          {list.map((a) => (
            <li key={a.code}>
              <button
                type="button"
                onMouseDown={() => {
                  onSelect(a.code);
                  setOpen(false);
                }}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-right transition hover:bg-brand-50"
              >
                <span>
                  <span className="block text-sm font-bold text-navy-900">{a.city}</span>
                  <span className="block text-[11px] text-muted">{a.name}</span>
                </span>
                <span className="font-mono text-[10px] text-muted">{a.code}</span>
              </button>
            </li>
          ))}
          {list.length === 0 && (
            <li className="px-3 py-4 text-center text-xs text-muted">موردی یافت نشد</li>
          )}
        </ul>
      )}
    </div>
  );
}

/* ---------- شمارنده ---------- */
function Counter({
  label,
  hint,
  value,
  min = 0,
  onChange,
}: {
  label: string;
  hint?: string;
  value: number;
  min?: number;
  onChange: (n: number) => void;
}) {
  return (
    <div className="flex items-center justify-between py-2.5">
      <span>
        <span className="block text-sm font-bold text-navy-900">{label}</span>
        {hint && <span className="block text-[10px] text-muted">{hint}</span>}
      </span>
      <div className="flex items-center gap-3">
        <button
          type="button"
          disabled={value <= min}
          onClick={() => onChange(Math.max(min, value - 1))}
          className="rounded-lg border border-line p-1.5 text-muted transition hover:border-brand-500 hover:text-brand-600 disabled:cursor-not-allowed disabled:opacity-30"
        >
          <Minus className="h-3.5 w-3.5" />
        </button>
        <span className="w-5 text-center text-sm font-black text-navy-950">
          {toPersianNum(value)}
        </span>
        <button
          type="button"
          onClick={() => onChange(Math.min(9, value + 1))}
          className="rounded-lg border border-line p-1.5 text-muted transition hover:border-brand-500 hover:text-brand-600"
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

/* ---------- استایل مشترک سلول‌ها ---------- */
const cellLabel = "mb-1.5 flex items-center gap-1.5 text-[11px] font-bold text-muted";

/* ========== موتور جستجوی سفر ========== */
export function TravelEngine() {
  const [trip, setTrip] = useState<TripType>("one-way");
  const [origin, setOrigin] = useState("THR");
  const [destination, setDestination] = useState("MHD");
  const [depart, setDepart] = useState<JalaliDate | null>(null);
  const [ret, setRet] = useState<JalaliDate | null>(null);
  const [departOpen, setDepartOpen] = useState(false);
  const [retOpen, setRetOpen] = useState(false);
  const [pax, setPax] = useState({ adults: 1, children: 0, infants: 0 });
  const [cabin, setCabin] = useState<CabinClass>("economy");
  const [paxOpen, setPaxOpen] = useState(false);

  const totalPax = pax.adults + pax.children + pax.infants;

  const swap = () => {
    setOrigin(destination);
    setDestination(origin);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO فاز ۲: router.push("/flights?...")
    console.log({ trip, origin, destination, depart, ret, pax, cabin });
  };

  return (
    <div className="rounded-2xl border border-line bg-white shadow-[0_25px_70px_-20px_rgba(16,20,51,0.25)]">
      {/* ===== سربرگ: نوع سفر ===== */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3 lg:px-5">
        <div className="flex rounded-xl bg-surface p-1">
          {(["one-way", "round-trip"] as const).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setTrip(key)}
              className={cn(
                "rounded-lg px-5 py-2 text-sm font-black transition-all",
                trip === key
                  ? "bg-white text-navy-900 shadow-chip ring-1 ring-line"
                  : "text-muted hover:text-navy-900"
              )}
            >
              {key === "one-way" ? "یک‌طرفه" : "رفت‌وبرگشت"}
            </button>
          ))}
        </div>
        <span className="rounded-full bg-brand-50 px-3.5 py-1.5 text-[11px] font-black text-brand-600 ring-1 ring-brand-100">
          چندمقصدی — به‌زودی
        </span>
      </div>

      <form onSubmit={submit}>
        {/* ===== ردیف خطی فیلدها ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.15fr_auto_1.15fr_1fr_1fr_1.1fr_auto] lg:divide-x lg:divide-x-reverse lg:divide-line">
          {/* مبدا */}
          <div className="px-4 py-3.5 lg:py-4">
            <span className={cellLabel}>
              <PlaneTakeoff className="h-3.5 w-3.5 text-brand-500" />
              مبدا
            </span>
            <AirportInput value={origin} exclude={destination} onSelect={setOrigin} />
          </div>

          {/* جابجایی */}
          <div className="flex items-center justify-center py-2 lg:px-1.5 lg:py-0">
            <button
              type="button"
              onClick={swap}
              aria-label="جابجایی مبدا و مقصد"
              className="rounded-full border border-line bg-white p-2.5 text-navy-700 shadow-chip transition-all duration-300 hover:rotate-180 hover:border-brand-400 hover:text-brand-500"
            >
              <ArrowLeftRight className="h-4 w-4" />
            </button>
          </div>

          {/* مقصد */}
          <div className="px-4 py-3.5 lg:py-4">
            <span className={cellLabel}>
              <PlaneLanding className="h-3.5 w-3.5 text-navy-700" />
              مقصد
            </span>
            <AirportInput value={destination} exclude={origin} onSelect={setDestination} />
          </div>

          {/* تاریخ رفت */}
          <div className="relative px-4 py-3.5 lg:py-4">
            <span className={cellLabel}>
              <CalendarDays className="h-3.5 w-3.5 text-brand-500" />
              تاریخ رفت
            </span>
            <button
              type="button"
              onClick={() => setDepartOpen((o) => !o)}
              className="w-full bg-transparent text-right text-sm font-black text-navy-950 outline-none"
            >
              {depart ? (
                formatDateJalali(depart)
              ) : (
                <span className="font-normal text-muted/60">انتخاب تاریخ</span>
              )}
            </button>
            {departOpen && (
              <div className="absolute right-0 z-40 mt-3">
                <JalaliCalendar
                  value={depart}
                  onChange={(d) => {
                    setDepart(d);
                    setDepartOpen(false);
                  }}
                />
              </div>
            )}
          </div>

          {/* تاریخ برگشت */}
          <div
            className={cn(
              "relative px-4 py-3.5 lg:py-4",
              trip === "one-way" && "pointer-events-none opacity-40"
            )}
          >
            <span className={cellLabel}>
              <CalendarDays className="h-3.5 w-3.5 text-navy-700" />
              تاریخ برگشت
            </span>
            <button
              type="button"
              disabled={trip === "one-way"}
              onClick={() => setRetOpen((o) => !o)}
              className="w-full bg-transparent text-right text-sm font-black text-navy-950 outline-none"
            >
              {trip === "one-way" ? (
                <span className="font-normal text-muted/60">—</span>
              ) : ret ? (
                formatDateJalali(ret)
              ) : (
                <span className="font-normal text-muted/60">انتخاب تاریخ</span>
              )}
            </button>
            {retOpen && trip === "round-trip" && (
              <div className="absolute right-0 z-40 mt-3">
                <JalaliCalendar
                  value={ret}
                  onChange={(d) => {
                    setRet(d);
                    setRetOpen(false);
                  }}
                  minDate={depart || undefined}
                />
              </div>
            )}
          </div>

          {/* مسافران و کلاس */}
          <div className="relative px-4 py-3.5 lg:py-4">
            <span className={cellLabel}>
              <Users className="h-3.5 w-3.5 text-brand-500" />
              مسافران و کلاس
            </span>
            <button
              type="button"
              onClick={() => setPaxOpen((o) => !o)}
              className="flex w-full items-center justify-between bg-transparent text-right outline-none"
            >
              <span className="text-sm font-black text-navy-950">
                {toPersianNum(totalPax)} مسافر
                <span className="mr-2 text-[11px] font-normal text-muted">
                  {CABIN_LABELS[cabin]}
                </span>
              </span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 text-muted transition-transform",
                  paxOpen && "rotate-180"
                )}
              />
            </button>
            {paxOpen && (
              <div className="absolute right-0 z-40 mt-3 w-72 rounded-xl border border-line bg-white p-4 shadow-search">
                <Counter
                  label="بزرگسال"
                  hint="۱۲ سال به بالا"
                  value={pax.adults}
                  min={1}
                  onChange={(n) => setPax({ ...pax, adults: n })}
                />
                <Counter
                  label="کودک"
                  hint="۲ تا ۱۲ سال"
                  value={pax.children}
                  onChange={(n) => setPax({ ...pax, children: n })}
                />
                <Counter
                  label="نوزاد"
                  hint="زیر ۲ سال"
                  value={pax.infants}
                  onChange={(n) => setPax({ ...pax, infants: n })}
                />
                <div className="mt-3 grid grid-cols-3 gap-1.5 border-t border-line pt-3">
                  {(Object.keys(CABIN_LABELS) as CabinClass[]).map((k) => (
                    <button
                      key={k}
                      type="button"
                      onClick={() => setCabin(k)}
                      className={cn(
                        "rounded-lg py-2 text-[11px] font-black transition",
                        cabin === k
                          ? "bg-navy-700 text-white"
                          : "bg-surface text-muted hover:text-navy-900"
                      )}
                    >
                      {CABIN_LABELS[k]}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* دکمه جستجو */}
          <div className="p-3 lg:flex lg:items-center lg:pl-4 lg:pr-0">
            <button
              type="submit"
              className="flex h-12 w-full items-center justify-center gap-2.5 rounded-xl bg-brand-500 px-8 text-sm font-black text-white shadow-[0_10px_30px_-8px_rgba(255,124,3,0.6)] transition-all hover:bg-brand-600 hover:shadow-[0_14px_35px_-8px_rgba(255,124,3,0.75)] active:scale-[0.98] lg:h-14 lg:w-auto"
            >
              <Search className="h-4.5 w-4.5 h-5 w-5" />
              جستجوی پرواز
            </button>
          </div>
        </div>

        {/* ===== مسیرهای سریع ===== */}
        <div className="flex flex-wrap items-center gap-2 border-t border-line px-4 py-3 lg:px-5">
          <span className="flex items-center gap-1.5 text-[11px] font-bold text-muted">
            <Plane className="h-3.5 w-3.5 text-brand-500" />
            مسیرهای پرطرفدار:
          </span>
          {QUICK_ROUTES.map((r) => (
            <button
              key={r.label}
              type="button"
              onClick={() => {
                setOrigin(r.from);
                setDestination(r.to);
              }}
              className="rounded-full border border-line bg-white px-3.5 py-1.5 text-[11px] font-bold text-navy-700 transition hover:border-brand-300 hover:bg-brand-50 hover:text-brand-600"
            >
              {r.label}
            </button>
          ))}
        </div>
      </form>
    </div>
  );
}