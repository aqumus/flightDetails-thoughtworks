import { JourneyType } from './../model/JourneyType';
import { useState, useCallback } from 'react';
import {
  FlightDirection,
  FlightDetails,
  SearchedFlightDetails,
  FlightDetailsFormValues
} from './../model';
import { searchFlights } from '../model/searchFlights';

export type FlightDetailsContainerState = {
  readonly isSearching: boolean;
  readonly flights: ReadonlyArray<SearchedFlightDetails>;
};

const searchingFlightDetails = {
  isSearching: true,
  flights: []
};

const url = 'https://tw-frontenders.firebaseio.com/advFlightSearch.json';

export const useFlightDetails = (initialValue: FlightDetailsContainerState) => {
  const [flightDetails, _setFlightsDetails] = useState(initialValue);
  const searchFlightDetails = useCallback(
    async formValues => {
      _setFlightsDetails(searchingFlightDetails);
      const flightsData = await getFlightsData();
      // TODO: search the flights details in a web worker to avoid blocking UI
      const flights = searchFlightsbyFormValues(formValues, flightsData);
      _setFlightsDetails({ isSearching: false, flights });
    },
    [_setFlightsDetails]
  );
  return {
    flightDetails,
    searchFlightDetails
  };
};

async function getFlightsData() {
  const flightsResponse = await fetch(url);
  return flightsResponse.json();
}

function searchFlightsbyFormValues(
  formValues: FlightDetailsFormValues,
  flights: ReadonlyArray<FlightDetails>
) {
  const {
    origin,
    destination,
    departureDate,
    returnDate,
    journeyType,
    passengers,
    maxPrice
  } = formValues;
  const departureFlights = searchFlights(
    origin,
    destination,
    departureDate,
    flights
  );
  const customDepartureFlights = mapPassengerAndFilterFlightsByMaxPrice(
    departureFlights,
    passengers,
    maxPrice
  );
  const departureDetails = {
    origin,
    destination,
    date: departureDate,
    flights: customDepartureFlights,
    direction: FlightDirection.DEPARTURE
  };

  if (journeyType === JourneyType.RETURN) {
    const returnFlights = searchFlights(
      destination,
      origin,
      returnDate,
      flights
    );
    const customReturnFlights = mapPassengerAndFilterFlightsByMaxPrice(
      returnFlights,
      passengers,
      maxPrice
    );

    const returnDetails = {
      origin: destination,
      destination: origin,
      date: returnDate,
      flights: customReturnFlights,
      direction: FlightDirection.ARRIVAL
    };

    return [departureDetails, returnDetails];
  }

  return [departureDetails];
}

function mapPassengerAndFilterFlightsByMaxPrice(
  flights: ReadonlyArray<FlightDetails>,
  passengers: number,
  maxPrice?: number
) {
  return flights.reduce(
    (modifiedFlights: ReadonlyArray<FlightDetails>, flight: FlightDetails) => {
      const updatedPrice = flight.price * passengers;

      if (!maxPrice || updatedPrice < maxPrice) {
        modifiedFlights = [
          ...modifiedFlights,
          {
            ...flight,
            price: updatedPrice
          }
        ];
        return modifiedFlights;
      }

      // updatedPrice is greater than maxPrice so fliter out the flight
      return modifiedFlights;
    },
    []
  );
}
