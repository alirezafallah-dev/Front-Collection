// src/components/shared/hero/CategoryHero.tsx
import Image from "next/image";

interface CategoryHeroProps {
  /** مسیر تصویر بنر */
  image: string;
  /** متن alt برای SEO */
  alt: string;
  /** عنوان مخفی برای SEO (screen-reader) */
  srTitle: string;
}

/**
 * بنر ثابت دسته‌بندی
 * - دسکتاپ: تصویر نمایش داده می‌شود
 * - موبایل: خالی (فقط فضای خالی برای ساختار)
 */
export default function CategoryHero({ image, alt, srTitle }: CategoryHeroProps) {
  return (
    <section className="pt-6 md:pt-0">
      {/* ✅ عنوان مخفی برای SEO */}
      <h1 className="sr-only">{srTitle}</h1>

      <div className="ns-container">
        {/* ═══ تصویر هیرو — فقط در دسکتاپ نمایش داده می‌شود ═══ */}
        <div className="relative hidden md:block w-full aspect-[16/7] lg:aspect-[21/8]">
          <Image
            src={image}
            alt={alt}
            fill
            sizes="(max-width: 1280px) 100vw, 1280px"
            quality={85}
            priority
            fetchPriority="high"
            className="object-cover object-center md:object-contain md:object-top"
          />
        </div>
      </div>
    </section>
  );
}