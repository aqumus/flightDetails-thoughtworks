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

const flightDetails: ReadonlyArray<SearchedFlightDetails> = [
  {
    origin: 'Pune (PNQ)',
    destination: 'Delhi (DEL)',
    direction: FlightDirection.DEPARTURE,
    date: '2020/11/01',
    flights: [
      {
        arrivalTime: '6:00',
        date: '2020/11/01',
        departureTime: '5:00',
        flightNo: 'AI-101',
        name: 'Air India',
        origin: 'Pune (PNQ)',
        destination: 'Delhi (DEL)',
        price: 3525
      },
      {
        arrivalTime: '20:00',
        date: '2020/11/01',
        departureTime: '5:00',
        origin: 'Pune (PNQ)',
        destination: 'Delhi (DEL)',
        price: 10525,
        stops: [
          {
            arrivalTime: '10:00',
            date: '2020/11/01',
            departureTime: '5:00',
            flightNo: 'AI-101',
            name: 'Air India',
            origin: 'Pune (PNQ)',
            destination: 'Mumbai (MUM)',
            price: 3000
          },
          {
            arrivalTime: '20:00',
            date: '2020/11/01',
            departureTime: '13:00',
            flightNo: 'AI-101',
            name: 'Air India',
            origin: 'Mumbai (MUM)',
            destination: 'Delhi (DEL)',
            price: 7525
          }
        ]
      }
    ]
  }
];

export const useFlightDetails = (initialValue: FlightDetailsContainerState) => {
  const [flightDetails, _setFlightsDetails] = useState(initialValue);
  const searchFlightDetails = useCallback(
    async formValues => {
      _setFlightsDetails(searchingFlightDetails);
      const flightsData = await getFlightsData();
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
    journeyType
  } = formValues;
  const departureFlights = searchFlights(
    origin,
    destination,
    departureDate,
    flights
  );
  const departureDetails = {
    origin,
    destination,
    date: departureDate,
    flights: departureFlights,
    direction: FlightDirection.DEPARTURE
  };
  if (journeyType === JourneyType.RETURN) {
    const returnFlights = searchFlights(
      destination,
      origin,
      returnDate,
      flights
    );
    const returnDetails = {
      origin: destination,
      destination: origin,
      date: returnDate,
      flights: returnFlights,
      direction: FlightDirection.ARRIVAL
    };

    return [departureDetails, returnDetails];
  }

  return [departureDetails];
}
