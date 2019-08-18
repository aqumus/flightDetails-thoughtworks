import React, { useCallback } from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import { FlightDetailsForm } from '../FlightDetailsForm';
import { FlightDetailsList } from '../FlightDetailsList';
import { useSmallScreenMediaQuery, useFlightDetails } from '../../hooks';
import { FlightDetails } from '../../model';

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
      <Divider />
      <FlightDetailsList flightsDetails={flights} isSearching={isSearching} />
    </div>
  );
};
