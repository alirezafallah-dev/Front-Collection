import { Metadata } from "next";
import { notFound } from "next/navigation";
import { hotels, getHotelById } from "@/lib/data/hotels";
import { Header } from "@/components/layout/header";
import HotelGallery from "@/components/hotels/HotelGallery";
import HotelInfo from "@/components/hotels/HotelInfo";
import HotelAmenities from "@/components/hotels/HotelAmenities";
import HotelRooms from "@/components/hotels/HotelRooms";
import HotelReviews from "@/components/hotels/HotelReviews";
import HotelMap from "@/components/hotels/HotelMap";
import HotelSidebar from "@/components/hotels/HotelSidebar";
import HotelMobileBar from "@/components/hotels/HotelMobileBar";
import HotelMobileInfo from "@/components/hotels/HotelMobileInfo";
import HotelSimilar from "@/components/hotels/HotelSimilar";
import HotelsCTA from "@/components/hotels/HotelsCTA";
import Footer from "@/components/layout/footer";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const hotel = getHotelById(id);
  if (!hotel) return { title: "هتل یافت نشد" };
  return {
    title: `${hotel.name} | طوفان پرشین`,
    description: hotel.description,
  };
}

export async function generateStaticParams() {
  return hotels.map((hotel) => ({ id: hotel.id }));
}

export default async function HotelDetailPage({ params }: PageProps) {
  const { id } = await params;
  const hotel = getHotelById(id);
  if (!hotel) notFound();

  return (
    <main className="min-h-screen bg-slate-50">
      <Header />

      <div className="container-brand px-4 py-6 md:py-8">
        {/* Gallery */}
        <HotelGallery images={hotel.gallery} hotelName={hotel.name} />

        {/* 📱 Mobile Info Card - بعد از گالری */}
        <div className="mt-4">
          <HotelMobileInfo hotel={hotel} />
        </div>

        {/* 2 Column Layout - فقط دسکتاپ */}
        <div className="hidden lg:flex gap-6 mt-6 items-start">
          {/* Left Column */}
          <div className="flex-1 min-w-0 space-y-5">
            <HotelInfo hotel={hotel} />
            
            <div className="bg-white rounded-2xl border border-slate-100 p-5 md:p-7">
              <h2 className="text-lg md:text-xl font-black text-navy-900 mb-4">
                درباره این هتل
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-loose">
                {hotel.description}
              </p>
            </div>

            <HotelAmenities hotel={hotel} />
            <HotelRooms rooms={hotel.rooms} />
            <HotelReviews
              reviews={hotel.reviews}
              averageRating={hotel.rating}
              totalReviews={hotel.reviewCount}
            />
            <HotelMap
              coordinates={hotel.coordinates}
              address={hotel.address}
              name={hotel.name}
            />
          </div>

          {/* Right Column - Desktop Sidebar */}
          <HotelSidebar hotel={hotel} />
        </div>

        {/* 📱 Mobile Content - بدون سایدبار */}
        <div className="lg:hidden space-y-5 mt-5">
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <h2 className="text-lg font-black text-navy-900 mb-3">
              درباره این هتل
            </h2>
            <p className="text-sm text-slate-700 leading-loose">
              {hotel.description}
            </p>
          </div>

          <HotelAmenities hotel={hotel} />
          <HotelRooms rooms={hotel.rooms} />
          <HotelReviews
            reviews={hotel.reviews}
            averageRating={hotel.rating}
            totalReviews={hotel.reviewCount}
          />
          <HotelMap
            coordinates={hotel.coordinates}
            address={hotel.address}
            name={hotel.name}
          />
        </div>
      </div>

      <HotelsCTA />
      <HotelSimilar hotels={hotels} currentHotelId={hotel.id} />
      <Footer />

      {/* 📱 Mobile Sticky Bottom Bar */}
      <HotelMobileBar hotel={hotel} />
    </main>
  );
}