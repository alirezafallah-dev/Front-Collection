import { Shield, CreditCard, Plane, Headphones } from "lucide-react";

const features = [
  { icon: Shield, text: "ضمانت بازگشت وجه" },
  { icon: CreditCard, text: "پرداخت امن" },
  { icon: Plane, text: "صدور آنی بلیت" },
  { icon: Headphones, text: "پشتیبانی ۲۴/۷" },
];

export default function QuickTrustBar() {
  return (
    <section className="w-full bg-white py-6 border-b border-slate-100">
      <div className="container-brand">
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
          {features.map((feature, i) => (
            <div key={i} className="flex items-center gap-2">
              <feature.icon className="w-4 h-4 text-brand-500 flex-shrink-0" />
              <span className="text-xs md:text-sm text-slate-600 font-medium whitespace-nowrap">
                {feature.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}