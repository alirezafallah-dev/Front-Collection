import { redirect } from "next/navigation";

interface Props {
  searchParams: Promise<{
    city?: string;
    checkIn?: string;
    checkOut?: string;
    adults?: string;
    children?: string;
  }>;
}

export default async function HotelsSearchPage({ searchParams }: Props) {
  const params = await searchParams;
  
  // ساخت query string برای لیست هتل‌ها
  const searchQuery = new URLSearchParams();
  if (params.city) searchQuery.set("q", params.city);
  if (params.checkIn) searchQuery.set("checkIn", params.checkIn);
  if (params.checkOut) searchQuery.set("checkOut", params.checkOut);
  if (params.adults) searchQuery.set("adults", params.adults);
  if (params.children) searchQuery.set("children", params.children);

  // ریدایرکت به صفحه لیست هتل‌ها با پارامترها
  redirect(`/hotels?${searchQuery.toString()}`);
}