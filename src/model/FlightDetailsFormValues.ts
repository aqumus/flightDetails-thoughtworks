import { JourneyType } from './JourneyType';

export type FlightDetailsFormValues = {
  readonly journeyType: JourneyType;
  readonly origin: string;
  readonly destination: string;
  readonly departureDate: string;
  readonly returnDate: string;
  readonly passengers: number;
  readonly maxPrice?: number;
};
