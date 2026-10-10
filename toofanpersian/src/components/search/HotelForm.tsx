"use client";
import { useState, useRef, useEffect } from "react";
import { Search, MapPin, Users, Minus, Plus, X } from "lucide-react";
import {
  CityPicker,
  CityValue,
  DateRangePicker,
  DateRangeValue,
} from "./fields";

interface Props {
  initial?: {
    city?: CityValue | null;
    from?: string;
    to?: string;
    adults?: number;
    kids?: number;
    rooms?: number;
  };
}

export default function HotelForm({ initial }: Props) {
  const [city, setCity] = useState<CityValue | null>(initial?.city ?? null);
  const [dates, setDates] = useState<DateRangeValue>(
    initial?.from ? { from: initial.from, to: initial.to } : {}
  );
  const [adults, setAdults] = useState(initial?.adults ?? 2);
  const [kids, setKids] = useState(initial?.kids ?? 0);
  const [rooms, setRooms] = useState(initial?.rooms ?? 1);
  const [showPicker, setShowPicker] = useState(false);
  const [error, setError] = useState("");
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        setShowPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!city) { setError("لطفاً شهر یا هتل مقصد را انتخاب کنید"); return; }
    if (!dates.from) { setError("تاریخ ورود را انتخاب کنید"); return; }
    if (!dates.to) { setError("تاریخ خروج را انتخاب کنید"); return; }

    console.log("Hotel search:", { city, dates, adults, kids, rooms });
    alert("جستجو انجام شد!");
  };

  const totalGuests = adults + kids;

  return (
    <form onSubmit={submit} className="space-y-4">
      {/* Main fields */}
      <div className="flex items-stretch gap-2 md:gap-3 flex-wrap lg:flex-nowrap">
        
        {/* City */}
        <div className="flex-[2] min-w-[180px]">
          <div className="h-14 px-4 rounded-xl border border-slate-200 hover:border-brand-400 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-100 transition-all flex items-center bg-slate-50/50">
            <MapPin className="w-5 h-5 text-brand-500 ml-3 flex-shrink-0" />
            <CityPicker
              source="cities"
              value={city}
              onChange={setCity}
              placeholder="نام شهر یا هتل"
            />
          </div>
        </div>

        {/* DateRangePicker - یک تقویم برای هر دو تاریخ */}
        <div className="flex-[2] min-w-[240px]">
          <DateRangePicker
            value={dates}
            onChange={setDates}
            allowRange={true}
            fromName="از تاریخ"
            toName="تا تاریخ"
          />
        </div>

        {/* Guests & Rooms */}
        <div className="w-[120px] md:w-[140px] relative" ref={pickerRef}>
          <button
            type="button"
            onClick={() => setShowPicker(!showPicker)}
            className="w-full h-14 px-3 md:px-4 rounded-xl border border-slate-200 hover:border-brand-400 transition-all flex items-center gap-2 text-right bg-slate-50/50"
          >
            <Users className="w-5 h-5 text-brand-500 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="text-[10px] text-slate-400 font-medium">مسافران</div>
              <div className="text-sm font-bold text-slate-900 truncate">
                {totalGuests.toLocaleString("fa-IR")} نفر، {rooms} اتاق
              </div>
            </div>
          </button>

          {showPicker && (
            <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-xl border border-slate-200 shadow-2xl p-5 z-50">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-bold text-slate-900">تعداد مسافران</h4>
                <button type="button" onClick={() => setShowPicker(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <div className="space-y-4">
                {/* Adults */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold text-slate-900">بزرگسال</div>
                    <div className="text-xs text-slate-400">۱۲ سال به بالا</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button type="button" disabled={adults <= 1} onClick={() => setAdults(Math.max(1, adults - 1))} className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 disabled:opacity-30 hover:border-brand-400 hover:text-brand-600">
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-6 text-center font-bold text-slate-900">{adults}</span>
                    <button type="button" onClick={() => setAdults(Math.min(9, adults + 1))} className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:border-brand-400 hover:text-brand-600">
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="h-px bg-slate-100" />

                {/* Kids */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold text-slate-900">کودک</div>
                    <div className="text-xs text-slate-400">۲ تا ۱۲ سال</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button type="button" disabled={kids <= 0} onClick={() => setKids(Math.max(0, kids - 1))} className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 disabled:opacity-30 hover:border-brand-400 hover:text-brand-600">
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-6 text-center font-bold text-slate-900">{kids}</span>
                    <button type="button" onClick={() => setKids(Math.min(6, kids + 1))} className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:border-brand-400 hover:text-brand-600">
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="h-px bg-slate-100" />

                {/* Rooms */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold text-slate-900">اتاق</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button type="button" disabled={rooms <= 1} onClick={() => setRooms(Math.max(1, rooms - 1))} className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 disabled:opacity-30 hover:border-brand-400 hover:text-brand-600">
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-6 text-center font-bold text-slate-900">{rooms}</span>
                    <button type="button" onClick={() => setRooms(Math.min(5, rooms + 1))} className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:border-brand-400 hover:text-brand-600">
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              <button type="button" onClick={() => setShowPicker(false)} className="w-full mt-5 py-3 rounded-xl bg-brand-500 text-white text-sm font-bold hover:bg-brand-600 transition-all">
                تایید
              </button>
            </div>
          )}
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