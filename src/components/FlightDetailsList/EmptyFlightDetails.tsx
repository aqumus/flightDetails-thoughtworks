import React from 'react';
import styled from '@emotion/styled';
import { Col, Typography } from 'antd';
import { FlexRow } from '../FlexRow';
import emptyFlightImage from './emptyFlightDetails.png';

const { Text } = Typography;

const StyledImg = styled.img`
  width: 100%;
  height: auto;
`;

const StyledText = styled(Text)`
  font-size: 20px;
  display: flex;
  justify-content: center;
`;

const StyledRow = styled(FlexRow)`
  justify-content: center;
`;

export function EmptyFlightDetails() {
  return (
    <StyledRow>
      <Col span={12}>
        <StyledImg src={emptyFlightImage} alt="No flights details" />
        <StyledText type="secondary">No flight details</StyledText>
      </Col>
    </StyledRow>
  );
}
