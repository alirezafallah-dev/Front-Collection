export type TripType = "one-way" | "round-trip";
export type CabinClass = "economy" | "business" | "first-class";

export type Passenger = {
  adults: number;
  children: number;
  infants: number;
};

export type FlightSearchParams = {
  tripType: TripType;
  origin: string;
  destination: string;
  departDate: Date | null;
  returnDate: Date | null;
  passengers: Passenger;
  cabinClass: CabinClass;
};

export type Flight = {
  id: string;
  airline: string;
  airlineCode: string;
  flightNumber: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: number;
  price: number;
  currency: string;
  cabinClass: CabinClass;
  seatsLeft?: number;
};