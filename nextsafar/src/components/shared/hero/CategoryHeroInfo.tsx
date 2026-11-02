// src/components/shared/hero/CategoryHeroInfo.tsx
import type { ElementType } from "react";

export interface CategoryFeature {
  icon: ElementType;
  title: string;
  description: string;
}

interface CategoryHeroInfoProps {
  badge?: string;
  title: string;
  description: string;
  features?: CategoryFeature[];
  /** ✅ جدید: نمایش 4 کارت ویژگی؟ پیش‌فرض: true */
  showFeatures?: boolean;
}

export default function CategoryHeroInfo({
  badge = "سفر بعدی ایرانیان",
  title,
  description,
  features = [],
  showFeatures = true,
}: CategoryHeroInfoProps) {
  return (
    <section className="ns-container pb-8">
      {/* ═══ عنوان و توضیح ═══ */}
      <div className="text-center mb-8 md:mb-10">
        <div className="inline-flex items-center gap-2 mb-3">
          <div className="h-px w-8 bg-primary" />
          <span className="text-xs md:text-sm font-bold text-primary tracking-wide">
            {badge}
          </span>
          <div className="h-px w-8 bg-primary" />
        </div>

        <h2 className="text-2xl md:text-4xl font-extrabold text-text-strong mb-3 md:mb-4 leading-tight">
          {title}
        </h2>

        <p className="text-sm md:text-lg text-text-muted max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>
      </div>

      {/* ═══ Grid ویژگی‌ها — فقط در صورت فعال بودن ═══ */}
      {showFeatures && features.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group relative bg-white rounded-xl border border-border p-4 md:p-6 hover:border-primary/40 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary-lightest flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                </div>
                <h3 className="text-sm md:text-base font-extrabold text-text-strong mb-1.5 md:mb-2">
                  {feature.title}
                </h3>
                <p className="text-xs md:text-sm text-text-muted leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}