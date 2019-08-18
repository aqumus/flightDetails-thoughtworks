import React from 'react';
import moment from 'moment';
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Row, Col, Typography } from 'antd';
import { FlightDirection, DATE_FORMAT } from '../../model';
import styled from '@emotion/styled-base';
import flightIcon from './flightIcon.svg';
import { StyledResponsiveTitle } from '../StyledResponsiveTitle';
import { FlexRow } from '../FlexRow';

const { Text } = Typography;

type FlightDetailsListHeaderProps = {
  readonly origin: string;
  readonly destination: string;
  readonly date: string;
  readonly totalFlights: number;
  readonly direction: FlightDirection;
};

const HeaderContainer = styled(FlexRow)`
  flex-direction: column;
  padding-left: 10px;
`;

export const FlightDetailsListHeader: React.FC<
  FlightDetailsListHeaderProps
> = ({ origin, destination, date, totalFlights = 0, direction }) => {
  return (
    <Row
      type="flex"
      css={css`
        padding-bottom: 20px;
      `}
    >
      <img src={flightIcon} alt="Flight icon" />
      <HeaderContainer>
        <Row>
          <StyledResponsiveTitle
            level={3}
            smallScreenFontSize={20}
          >{`${origin} to ${destination}`}</StyledResponsiveTitle>
        </Row>
        <Row css={{ fontSize: '15px' }}>
          <Text
            type="secondary"
            css={css`
              padding-right: 15px;
            `}
          >
            {`${totalFlights} ${
              totalFlights === 1 ? 'flight' : 'flights'
            } found`}
          </Text>
          <Text type="secondary">{`${moment(date, DATE_FORMAT).format(
            'ddd, DD MMMM'
          )}`}</Text>
        </Row>
      </HeaderContainer>
    </Row>
  );
};
