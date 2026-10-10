"use client";
import { useEffect, useState } from "react";
import { Search, ArrowLeftRight, PlaneTakeoff, PlaneLanding } from "lucide-react";
import {
  CityPicker,
  CityValue,
  DateRangePicker,
  DateRangeValue,
  PassengerPicker,
} from "./fields";

interface Props {
  initial?: {
    origin?: CityValue | null;
    dest?: CityValue | null;
    from?: string;
    to?: string;
    adults?: number;
    kids?: number;
    infants?: number;
  };
}

export default function FlightForm({ initial }: Props) {
  const [tripType, setTripType] = useState<"one" | "round">("one");
  const [cabin, setCabin] = useState("economy");
  const [origin, setOrigin] = useState<CityValue | null>(initial?.origin ?? { label: "تهران", code: "THR" });
  const [dest, setDest] = useState<CityValue | null>(initial?.dest ?? { label: "مشهد", code: "MHD" });
  const [dates, setDates] = useState<DateRangeValue>(
    initial?.from ? { from: initial.from, to: initial.to } : {}
  );
  const [adults, setAdults] = useState(initial?.adults ?? 1);
  const [kids, setKids] = useState(initial?.kids ?? 0);
  const [infants, setInfants] = useState(initial?.infants ?? 0);
  const [error, setError] = useState("");

  useEffect(() => {
    if (tripType === "one") {
      setDates((d) => ({ from: d.from, to: undefined }));
    }
  }, [tripType]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!origin) { setError("مبدا را انتخاب کنید"); return; }
    if (!dest) { setError("مقصد را انتخاب کنید"); return; }
    if (!dates.from) { setError("تاریخ رفت را انتخاب کنید"); return; }
    if (tripType === "round" && !dates.to) { setError("تاریخ برگشت را انتخاب کنید"); return; }

    console.log("Flight search:", { tripType, cabin, origin, dest, dates, adults, kids, infants });
    alert("جستجو انجام شد!");
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      {/* Trip type row */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex bg-slate-100 rounded-lg p-0.5">
          <button
            type="button"
            onClick={() => setTripType("one")}
            className={`px-4 py-1.5 rounded-md text-xs font-bold transition ${
              tripType === "one" ? "bg-white shadow-sm text-slate-900" : "text-slate-500"
            }`}
          >
            یک‌طرفه
          </button>
          <button
            type="button"
            onClick={() => setTripType("round")}
            className={`px-4 py-1.5 rounded-md text-xs font-bold transition ${
              tripType === "round" ? "bg-white shadow-sm text-slate-900" : "text-slate-500"
            }`}
          >
            رفت‌وبرگشت
          </button>
        </div>
        <select
          value={cabin}
          onChange={(e) => setCabin(e.target.value)}
          className="h-8 px-3 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 outline-none focus:border-brand-500"
        >
          <option value="economy">اکونومی</option>
          <option value="business">بیزینس</option>
          <option value="first-class">فرست‌کلاس</option>
        </select>
      </div>

      {/* Main fields */}
      <div className="flex items-stretch gap-2 md:gap-3 flex-wrap lg:flex-nowrap">
        
        {/* Origin */}
        <div className="flex-1 min-w-[140px]">
          <div className="h-14 px-4 rounded-xl border border-slate-200 hover:border-brand-400 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-100 transition-all flex items-center bg-slate-50/50">
            <PlaneTakeoff className="w-5 h-5 text-brand-500 ml-3 flex-shrink-0" />
            <CityPicker
              source="airports"
              value={origin}
              onChange={setOrigin}
              placeholder="مبدا"
            />
          </div>
        </div>

        {/* Swap */}
        <ArrowLeftRight className="hidden lg:block w-5 h-5 self-center text-slate-300" />
        <button
          type="button"
          onClick={() => { const t = origin; setOrigin(dest); setDest(t); }}
          className="lg:hidden w-10 h-10 self-center rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:border-brand-400 hover:text-brand-500 hover:rotate-180 transition-all flex-shrink-0"
        >
          <ArrowLeftRight className="w-4 h-4" />
        </button>

        {/* Destination */}
        <div className="flex-1 min-w-[140px]">
          <div className="h-14 px-4 rounded-xl border border-slate-200 hover:border-brand-400 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-100 transition-all flex items-center bg-slate-50/50">
            <PlaneLanding className="w-5 h-5 text-brand-500 ml-3 flex-shrink-0" />
            <CityPicker
              source="airports"
              value={dest}
              onChange={setDest}
              placeholder="مقصد"
            />
          </div>
        </div>

        {/* DateRangePicker */}
        <div className="flex-[1.5] min-w-[200px]">
          <DateRangePicker
            value={dates}
            onChange={setDates}
            allowRange={tripType === "round"}
            fromName="تاریخ رفت"
            toName={tripType === "round" ? "تاریخ برگشت" : ""}
          />
        </div>

        {/* Passengers */}
        <div className="w-[110px] md:w-[120px]">
          <div className="h-14 px-3 rounded-xl border border-slate-200 hover:border-brand-400 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-100 transition-all flex items-center bg-slate-50/50">
            <PassengerPicker
              adults={adults}
              children={kids}
              infants={infants}
              onChange={(a, c, i) => {
                setAdults(a);
                setKids(c);
                setInfants(i);
              }}
            />
          </div>
        </div>

        {/* Search button */}
        <button
          type="submit"
          className="h-14 px-6 md:px-8 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm flex items-center gap-2 transition-all shadow-lg shadow-brand-500/20 hover:shadow-xl hover:shadow-brand-500/30 flex-shrink-0"
        >
          <Search className="w-5 h-5" />
          <span>جستجو</span>
        </button>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-100">
          <span className="text-red-500">⚠️</span>
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}
    </form>
  );
}