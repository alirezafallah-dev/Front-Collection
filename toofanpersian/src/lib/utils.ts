import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toPersianNumber(num: number | string): string {
  const persianDigits = ["۰", "", "۲", "", "۴", "", "۶", "", "۸", ""];
  return String(num).replace(/[0-9]/g, (d) => persianDigits[parseInt(d)]);
}

export function formatPrice(price: number): string {
  return toPersianNumber(price.toLocaleString());
}