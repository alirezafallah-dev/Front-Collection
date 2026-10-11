"use client";

import { useEffect, useState } from "react";
import { Search, ArrowLeftRight, PlaneTakeoff, PlaneLanding, ChevronDown } from "lucide-react";
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

  const swapCities = () => {
    const temp = origin;
    setOrigin(dest);
    setDest(temp);
  };

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
    <form onSubmit={submit} className="space-y-4 font-[var(--font-vazirmatn)]">
      {/* Trip type row - full width روی موبایل */}
      <div className="flex items-center gap-3">
        <div className="flex bg-slate-100 rounded-lg p-0.5 flex-1 lg:flex-initial">
          <button
            type="button"
            onClick={() => setTripType("one")}
            className={`flex-1 lg:flex-initial px-3 sm:px-4 py-1.5 rounded-md text-xs font-bold transition ${
              tripType === "one" ? "bg-white shadow-sm text-slate-900" : "text-slate-500"
            }`}
          >
            یک‌طرفه
          </button>
          <button
            type="button"
            onClick={() => setTripType("round")}
            className={`flex-1 lg:flex-initial px-3 sm:px-4 py-1.5 rounded-md text-xs font-bold transition ${
              tripType === "round" ? "bg-white shadow-sm text-slate-900" : "text-slate-500"
            }`}
          >
            رفت‌وبرگشت
          </button>
        </div>
        <div className="relative flex-1 lg:flex-initial">
          <select
            value={cabin}
            onChange={(e) => setCabin(e.target.value)}
            className="w-full lg:w-auto h-8 px-3 pl-8 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 outline-none focus:border-brand-500 appearance-none cursor-pointer bg-white font-[var(--font-vazirmatn)]"
          >
            <option value="economy">اکونومی</option>
            <option value="business">بیزینس</option>
            <option value="first-class">فرست‌کلاس</option>
          </select>
          <ChevronDown className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex items-stretch gap-3">
        {/* Origin + Swap + Destination */}
        <div className="flex-1 min-w-[480px] relative flex items-stretch gap-5">
          {/* Origin */}
          <div className="flex-1 min-w-0">
            <div className="search-field search-field-padding rounded-xl border border-slate-200 hover:border-brand-400 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-100 transition-all flex items-center">
              <PlaneTakeoff className="w-5 h-5 text-brand-500 ml-3 flex-shrink-0" />
              <CityPicker
                source="airports"
                value={origin}
                onChange={setOrigin}
                placeholder="مبدا"
              />
            </div>
          </div>

          {/* Destination */}
          <div className="flex-1 min-w-0">
            <div className="search-field search-field-padding rounded-xl border border-slate-200 hover:border-brand-400 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-100 transition-all flex items-center">
              <PlaneLanding className="w-5 h-5 text-brand-500 ml-3 flex-shrink-0" />
              <CityPicker
                source="airports"
                value={dest}
                onChange={setDest}
                placeholder="مقصد"
              />
            </div>
          </div>

          {/* Swap Button - Desktop */}
          <button
            type="button"
            onClick={swapCities}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white border-2 border-brand-500 flex items-center justify-center text-brand-500 hover:bg-brand-500 hover:text-white hover:rotate-180 transition-all duration-300 cursor-pointer shadow-md"
            aria-label="جابجایی مبدا و مقصد"
          >
            <ArrowLeftRight className="w-4 h-4" />
          </button>
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
        <div className="w-[145px]">
          <div className="search-field search-field-padding rounded-xl border border-slate-200 hover:border-brand-400 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-100 transition-all flex items-center">
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
          className="search-field px-5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm flex items-center gap-2 transition-all shadow-lg shadow-brand-500/20 hover:shadow-xl hover:shadow-brand-500/30 flex-shrink-0"
        >
          <Search className="w-5 h-5" />
          <span>جستجو</span>
        </button>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden space-y-3">
        {/* Origin + Swap */}
        <div className="flex items-center gap-2">
          <div className="flex-1 min-w-0">
            <div className="search-field search-field-padding rounded-xl border border-slate-200 hover:border-brand-400 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-100 transition-all flex items-center bg-white">
              <PlaneTakeoff className="w-5 h-5 text-brand-500 ml-2 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <CityPicker
                  source="airports"
                  value={origin}
                  onChange={setOrigin}
                  placeholder="مبدا"
                />
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={swapCities}
            className="flex-shrink-0 w-10 h-10 rounded-full bg-white border-2 border-brand-500 flex items-center justify-center text-brand-500 hover:bg-brand-500 hover:text-white hover:rotate-180 transition-all shadow-md"
            aria-label="جابجایی مبدا و مقصد"
          >
            <ArrowLeftRight className="w-4 h-4" />
          </button>
        </div>

        {/* Destination */}
        <div className="search-field search-field-padding rounded-xl border border-slate-200 hover:border-brand-400 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-100 transition-all flex items-center bg-white">
          <PlaneLanding className="w-5 h-5 text-brand-500 ml-3 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <CityPicker
              source="airports"
              value={dest}
              onChange={setDest}
              placeholder="مقصد"
            />
          </div>
        </div>

        {/* DateRangePicker - با search-field */}
        <div className="search-field">
          <DateRangePicker
            value={dates}
            onChange={setDates}
            allowRange={tripType === "round"}
            fromName="تاریخ رفت"
            toName={tripType === "round" ? "تاریخ برگشت" : ""}
          />
        </div>

        {/* Passengers - با search-field */}
        <div className="search-field search-field-padding rounded-xl border border-slate-200 hover:border-brand-400 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-100 transition-all flex items-center bg-white">
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

        {/* Search button */}
        <button
          type="submit"
          className="search-field w-full rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-base flex items-center justify-center gap-2 transition-all shadow-lg shadow-brand-500/20 px-5"
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