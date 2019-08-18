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

const ListContainer = styled.div<{ hasReturnFlight: boolean }>(
  ({ hasReturnFlight }) => `
  height: ${hasReturnFlight ? '40vh' : '80vh'};
  max-height: ${hasReturnFlight ? '40vh' : '80vh'};
  margin-bottom: 20px;
  overflow: scroll;
`
);

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
        ({ origin, destination, flights, date, direction }, index) => (
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={24}
            xl={flightDetailsColSize}
            key={index}
          >
            <FlightDetailsListHeader
              origin={origin}
              destination={destination}
              date={date}
              totalFlights={flights.length}
              direction={direction}
            />
            <ListContainer hasReturnFlight={hasReturnFlight}>
              {flights.map((details: FlightDetails, index) => (
                <FlightDeltailsListItem {...details} key={index} />
              ))}
            </ListContainer>
          </Col>
        )
      )}
    </FlightList>
  );
}
