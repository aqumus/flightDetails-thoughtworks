import moment from 'moment';
import { DATE_FORMAT } from './dateTimeFormat';

import { FlightDetails } from './FlightDetails';

const maximumTravelWindow = moment.duration(3, 'days');

const FLIGHT_TIME_FORMAT = 'YYYY/MM/DD, HH:mm';

export function searchFlights(
  origin: string,
  desitination: string,
  date: string,
  flights: ReadonlyArray<FlightDetails>
): ReadonlyArray<FlightDetails> {
  let searchedFlights: ReadonlyArray<FlightDetails> = [];
  const originDate = moment(date, DATE_FORMAT);
  const flightsFromOrigin = flights.filter((flight: FlightDetails) => {
    const flightDate = moment(flight.date, DATE_FORMAT);
    return origin === flight.origin && originDate.isSame(flightDate, 'day');
  });

  // get Flights arriving at destination , keeping a window of 2days (could be extended further)
  const windowedDate = moment(date, DATE_FORMAT).add(maximumTravelWindow);
  const windowedFlights = flights.filter((flight: FlightDetails) => {
    const flightDate = moment(flight.date, DATE_FORMAT);
    return flightDate.isBefore(windowedDate);
  });

  const flightsArrivingAtDestination = windowedFlights.filter(
    (flight: FlightDetails) => {
      const flightDate = moment(flight.date, DATE_FORMAT);
      return (
        desitination === flight.destination && flightDate.isBefore(windowedDate)
      );
    }
  );

  const {
    includedFlights: nonStopFlights,
    nonIncludedFlights: nonDirectFlight
  } = partitionFlights(flightsArrivingAtDestination, flightsFromOrigin);

  // filtering out nonStopFLights from windowed flights
  const { nonIncludedFlights: filteredWindowedFlight } = partitionFlights(
    windowedFlights,
    nonStopFlights
  );

  for (const flight of nonDirectFlight) {
    const result = recurseFind(
      flight,
      filteredWindowedFlight,
      flightsFromOrigin
    );
    const resultDetail = result.map((sf: ReadonlyArray<FlightDetails>) => {
      return cumulateStopsFLightDetails(sf);
    });
    searchedFlights = [...searchedFlights, ...resultDetail];
  }

  return [...nonStopFlights, ...searchedFlights];
}

type FlightDetailsCollection = ReadonlyArray<ReadonlyArray<FlightDetails>>;

function recurseFind(
  flight: FlightDetails,
  flights: ReadonlyArray<FlightDetails>,
  originFlights: ReadonlyArray<FlightDetails>
) {
  let finalArr: FlightDetailsCollection = [];
  const resultOrigin = flight.origin;
  const departureTime = getFlightDepartureTimeInMoment(flight);
  const bufferArrivalTime = departureTime.subtract(30, 'minutes');
  const sFlights = flights.filter((flight: FlightDetails) => {
    const arrivalTime = getFlightArrivalTimeInMoment(flight);
    return (
      flight.destination === resultOrigin &&
      arrivalTime.isSameOrBefore(bufferArrivalTime)
    );
  });

  if (!sFlights.length) {
    return finalArr;
  }

  const { includedFlights, nonIncludedFlights } = partitionFlights(
    sFlights,
    originFlights
  );

  if (includedFlights.length) {
    finalArr = [...finalArr, ...addFlightToFlights(includedFlights, flight)];
  }

  if (!nonIncludedFlights.length) {
    return finalArr;
  }

  // filter out the origin flights which are already founded/included
  const { nonIncludedFlights: filteredOriginFlights } = partitionFlights(
    includedFlights,
    originFlights
  );

  const hFlights: FlightDetailsCollection = nonIncludedFlights
    .reduce((accumFlights: FlightDetailsCollection, nFlight: FlightDetails) => {
      const result = recurseFind(nFlight, flights, filteredOriginFlights);
      return [...accumFlights, ...result];
    }, [])
    .map((cFlights: ReadonlyArray<FlightDetails>) => [...cFlights, flight]);

  return [...finalArr, ...hFlights];
}

function partitionFlights(
  sampleFlights: ReadonlyArray<FlightDetails>,
  originFlights: ReadonlyArray<FlightDetails>
) {
  let includedFlights: ReadonlyArray<FlightDetails> = [];
  let nonIncludedFlights: ReadonlyArray<FlightDetails> = [];

  sampleFlights.forEach((flight: FlightDetails) => {
    if (includesFlight(originFlights, flight)) {
      includedFlights = [...includedFlights, flight];
    } else {
      nonIncludedFlights = [...nonIncludedFlights, flight];
    }
  });

  return { includedFlights, nonIncludedFlights };
}

function addFlightToFlights(
  flights: ReadonlyArray<FlightDetails>,
  flight: FlightDetails
) {
  return flights.map(flightsArr => [flightsArr, flight]);
}

function includesFlight(
  flights: ReadonlyArray<FlightDetails>,
  flight: FlightDetails
) {
  return flights.some(
    ({ origin, destination, date, flightNo }: FlightDetails) =>
      origin === flight.origin &&
      destination === flight.destination &&
      date === flight.date &&
      flightNo === flight.flightNo
  );
}

function getFlightDepartureTimeInMoment({
  date,
  departureTime
}: FlightDetails) {
  return moment(`${date}, ${departureTime}`, FLIGHT_TIME_FORMAT);
}

function getFlightArrivalTimeInMoment({ date, arrivalTime }: FlightDetails) {
  return moment(`${date}, ${arrivalTime}`, FLIGHT_TIME_FORMAT);
}

function cumulateStopsFLightDetails(
  flightDetailsCollection: ReadonlyArray<FlightDetails>
) {
  return flightDetailsCollection.reduce(
    (flightDetails: FlightDetails, flight: FlightDetails, index: number) => {
      if (index === 0) {
        flightDetails = {
          ...flightDetails,
          origin: flight.origin,
          date: flight.date,
          departureTime: flight.departureTime
        };
      }

      if (index === flightDetailsCollection.length - 1) {
        flightDetails = {
          ...flightDetails,
          destination: flight.destination,
          arrivalTime: flight.arrivalTime
        };
      }

      flightDetails = {
        ...flightDetails,
        price: (flightDetails.price || 0) + flight.price,
        stops: [...(flightDetails.stops || []), flight]
      };
      return flightDetails;
    },
    {} as FlightDetails
  );
}
