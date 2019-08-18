import React from 'react';
import styled from '@emotion/styled';
import { Skeleton } from 'antd';
import { StyledResponsiveTitle } from '../StyledResponsiveTitle';
import { FlexRow } from '../FlexRow';

const StyledFlexRow = styled(FlexRow)`
  flex-direction: column;
  padding: 15px;
`;

export function SearchingFlightDetails() {
  return (
    <StyledFlexRow>
      <StyledResponsiveTitle level={3} smallScreenFontSize={16}>
        Searching flight details ...
      </StyledResponsiveTitle>
      <Skeleton active />
    </StyledFlexRow>
  );
}
