import React, { useCallback } from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import {
  FlightDetailsForm,
  DrawerFlightDetailsForm
} from '../FlightDetailsForm';
import { FlightDetailsList } from '../FlightDetailsList';
import {} from '../FlightDetailsForm';
import { useSmallScreenMediaQuery, useFlightDetails } from '../../hooks';

const FlightDetailConatinerStyles = css`
  display: flex;
`;

const Divider = styled.div`
  margin: 0 5px 0 5px;
  border-left: 1px solid #b5b2b2;
`;

const flightDetailsInitialValue = {
  isSearching: false,
  flights: []
};

export const FlightDetailsContainer: React.FC = () => {
  const isSmallScreen = useSmallScreenMediaQuery();
  const {
    flightDetails: { flights, isSearching },
    searchFlightDetails
  } = useFlightDetails(flightDetailsInitialValue);
  const onSubmit = useCallback(
    submittedFormValues => {
      searchFlightDetails(submittedFormValues);
    },
    [searchFlightDetails]
  );

  return (
    <div css={FlightDetailConatinerStyles}>
      {!isSmallScreen && <FlightDetailsForm onSubmit={onSubmit} />}
      {!isSmallScreen && <Divider />}
      {isSmallScreen && (
        <DrawerFlightDetailsForm
          onSubmit={onSubmit}
          isSearching={isSearching}
        />
      )}
      <FlightDetailsList flightsDetails={flights} isSearching={isSearching} />
    </div>
  );
};
