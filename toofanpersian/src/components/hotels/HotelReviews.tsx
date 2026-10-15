"use client";

import { useState } from "react";
import { Star, ThumbsUp, MessageSquare, ChevronDown } from "lucide-react";
import Image from "next/image";
import { HotelReview } from "@/lib/data/hotels";
import { cn } from "@/lib/utils";

interface HotelReviewsProps {
  reviews: HotelReview[];
  averageRating: number;
  totalReviews: string;
}

export default function HotelReviews({ reviews, averageRating, totalReviews }: HotelReviewsProps) {
  const [showAll, setShowAll] = useState(false);

  const ratingLabel = 
    averageRating >= 4.8 ? "فوق‌العاده" :
    averageRating >= 4.5 ? "عالی" :
    averageRating >= 4.0 ? "خیلی خوب" : "خوب";

  // امتیازبندی دسته‌ای
  const ratingBreakdown = [5, 4, 3, 2, 1].map(star => ({
    star,
    count: reviews.filter(r => Math.floor(r.rating) === star).length,
    percent: (reviews.filter(r => Math.floor(r.rating) === star).length / reviews.length) * 100,
  }));

  const visibleReviews = showAll ? reviews : reviews.slice(0, 3);

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5 md:p-7">
      {/* Header */}
      <div className="flex items-start justify-between mb-6 pb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <MessageSquare className="w-5 h-5 text-brand-600" />
            <h2 className="text-lg md:text-xl font-black text-navy-900">
              نظرات مسافران
            </h2>
          </div>
          <p className="text-sm text-slate-500">
            بر اساس {totalReviews} نظر تایید شده
          </p>
        </div>
      </div>

      {/* Score Summary - Two Column */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Big Score */}
        <div className="flex items-center gap-5 p-5 rounded-2xl bg-gradient-to-br from-navy-900 to-navy-800 text-white">
          <div className="w-20 h-20 rounded-2xl bg-brand-500 flex items-center justify-center flex-shrink-0 shadow-xl shadow-brand-500/30">
            <span className="text-4xl font-black">{averageRating}</span>
          </div>
          <div>
            <div className="text-2xl font-black mb-1">{ratingLabel}</div>
            <div className="flex items-center gap-0.5 mb-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "w-4 h-4",
                    i < Math.floor(averageRating)
                      ? "text-brand-400 fill-brand-400"
                      : "text-white/30"
                  )}
                />
              ))}
            </div>
            <div className="text-xs text-white/70">{totalReviews} نظر</div>
          </div>
        </div>

        {/* Rating Breakdown */}
        <div className="space-y-2">
          {ratingBreakdown.map((item) => (
            <div key={item.star} className="flex items-center gap-3">
              <div className="flex items-center gap-1 w-12 flex-shrink-0">
                <span className="text-sm font-bold text-navy-900">{item.star}</span>
                <Star className="w-3 h-3 text-brand-500 fill-brand-500" />
              </div>
              <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-brand-500 to-brand-600 rounded-full transition-all"
                  style={{ width: `${item.percent}%` }}
                />
              </div>
              <span className="text-xs text-slate-500 w-6 text-left">
                {item.count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {visibleReviews.map((review) => (
          <div
            key={review.id}
            className="p-4 md:p-5 rounded-2xl border border-slate-100 hover:border-slate-200 hover:shadow-sm transition-all"
          >
            {/* Header */}
            <div className="flex items-start gap-3 mb-3">
              <div className="relative w-11 h-11 rounded-full overflow-hidden ring-2 ring-slate-100 flex-shrink-0">
                <Image
                  src={review.avatar}
                  alt={review.author}
                  fill
                  sizes="44px"
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div>
                    <div className="font-bold text-sm text-navy-900 flex items-center gap-1.5">
                      {review.author}
                      <span className="text-base">{review.flag || "👤"}</span>
                    </div>
                    <div className="text-xs text-slate-500">
                      {review.tripType} • {review.date}
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5 px-2 py-1 rounded-lg bg-brand-50">
                    <Star className="w-3 h-3 text-brand-600 fill-brand-600" />
                    <span className="text-xs font-black text-brand-700">
                      {review.rating}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <h4 className="text-sm font-bold text-navy-900 mb-1.5">
              {review.title}
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              {review.comment}
            </p>

            {/* Actions */}
            <div className="flex items-center gap-4 mt-3 pt-3 border-t border-slate-50">
              <button className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-brand-600 transition-colors">
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>مفید بود</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Show More */}
      {reviews.length > 3 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-6 w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-slate-200 hover:border-brand-500 hover:bg-brand-50 text-sm font-bold text-slate-700 hover:text-brand-700 transition-all"
        >
          <span>
            {showAll 
              ? "نمایش کمتر" 
              : `مشاهده همه ${reviews.length} نظر`}
          </span>
          <ChevronDown className={cn("w-4 h-4 transition-transform", showAll && "rotate-180")} />
        </button>
      )}
    </div>
  );
}