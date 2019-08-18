import { FlightDirection } from './FlightDirection';
import { FlightDetails } from './FlightDetails';

export type SearchedFlightDetails = {
  readonly origin: string;
  readonly destination: string;
  readonly direction: FlightDirection;
  readonly date: string;
  readonly flights: ReadonlyArray<FlightDetails>;
};
