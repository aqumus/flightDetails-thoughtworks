import React from 'react';
import { Col } from 'antd';
import styled from '@emotion/styled';
import { FlightDeltailsListItem } from './FlightDetailsListItem';
import { FlightDetailsListHeader } from './FlightDetailsListHeader';
import { FlightDetails, SearchedFlightDetails } from '../../model';
import { SearchingFlightDetails } from './SearchingFlightDetails';
import { FlexRow } from '../FlexRow';
import { EmptyFlightDetails } from './EmptyFlightDetails';

const FlightList = styled(FlexRow)`
  padding: 10px;
`;

type FlightDetailsListProps = {
  readonly flightsDetails: ReadonlyArray<SearchedFlightDetails>;
  readonly isSearching: boolean;
};

export function FlightDetailsList({
  flightsDetails,
  isSearching = true
}: FlightDetailsListProps) {
  if (isSearching) {
    return <SearchingFlightDetails />;
  }
  if (!isSearching && !flightsDetails.length) {
    return <EmptyFlightDetails />;
  }
  const hasReturnFlight = flightsDetails.length > 1;
  const flightDetailsColSize = hasReturnFlight ? 12 : 24;
  return (
    <FlightList>
      {flightsDetails.map(
        ({ origin, destination, flights, date, direction }) => (
          <Col
            xs={24}
            sm={24}
            md={flightDetailsColSize}
            lg={flightDetailsColSize}
            xl={flightDetailsColSize}
          >
            <FlightDetailsListHeader
              origin={origin}
              destination={destination}
              date={date}
              totalFlights={flights.length}
              direction={direction}
            />
            {flights.map((details: FlightDetails) => (
              <FlightDeltailsListItem {...details} />
            ))}
          </Col>
        )
      )}
    </FlightList>
  );
}
