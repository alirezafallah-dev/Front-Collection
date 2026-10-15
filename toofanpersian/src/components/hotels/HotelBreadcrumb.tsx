import Link from "next/link";
import { ChevronLeft, Home } from "lucide-react";

interface BreadcrumbProps {
  country: string;
  countrySlug: string;
  city: string;
  hotelName: string;
}

export default function HotelBreadcrumb({ country, countrySlug, city, hotelName }: BreadcrumbProps) {
  const items = [
    { label: "خانه", href: "/", icon: Home },
    { label: "هتل‌ها", href: "/hotels" },
    { label: country, href: `/destinations/${countrySlug}` },
    { label: city },
    { label: hotelName, active: true },
  ];

  return (
    <nav className="flex items-center gap-1.5 text-xs text-slate-500 overflow-x-auto scrollbar-hide pb-2">
      {items.map((item, i) => {
        const Icon = item.icon;
        const isLast = i === items.length - 1;
        
        return (
          <div key={i} className="flex items-center gap-1.5 flex-shrink-0">
            {i > 0 && (
              <ChevronLeft className="w-3 h-3 text-slate-400 flex-shrink-0" />
            )}
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="flex items-center gap-1 hover:text-brand-600 transition-colors"
              >
                {Icon && <Icon className="w-3 h-3" />}
                <span>{item.label}</span>
              </Link>
            ) : (
              <span className={cn(
                "flex items-center gap-1",
                isLast ? "text-navy-900 font-bold truncate max-w-[200px]" : ""
              )}>
                {Icon && <Icon className="w-3 h-3" />}
                <span className={isLast ? "truncate" : ""}>{item.label}</span>
              </span>
            )}
          </div>
        );
      })}
    </nav>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}