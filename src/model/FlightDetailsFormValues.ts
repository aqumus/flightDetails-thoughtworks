import { JourneyType } from './JourneyType';
import { FlightDirection } from './FlightDirection';

export type FlightDetailsFormValues = {
  readonly journeyType: JourneyType;
  readonly origin: string;
  readonly destination: string;
  readonly departureDate: string;
  readonly returnDate: string;
  readonly passengers: string;
  readonly maxPrice: string;
};
