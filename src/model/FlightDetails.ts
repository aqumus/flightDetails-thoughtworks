export type FlightDetails = {
  readonly arrivalTime: string;
  readonly date: string;
  readonly departureTime: string;
  readonly flightNo?: string;
  readonly name?: string;
  readonly origin: string;
  readonly destination: string;
  readonly price: number;
  readonly stops?: ReadonlyArray<FlightDetails>;
  readonly isDetailedItem?: boolean;
};
