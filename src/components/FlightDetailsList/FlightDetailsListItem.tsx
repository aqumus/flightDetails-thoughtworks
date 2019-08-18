import React, { useMemo } from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import { Col, Typography, Button, Card } from 'antd';
import moment, { Duration, Moment } from 'moment';
import { FlexRow } from '../FlexRow';
import { StyledResponsiveTitle } from '../StyledResponsiveTitle';
import multipleFlightIcon from './multipleFlightIcon.svg';
import directAirplaneIcon from './directAirplaneIcon.png';
import { useMultipleFlightDetails } from '../../hooks';
import { getDurationInString } from '../../utils';
import { LayOverDuration } from './LayoverDuration';
import { FlightDetails } from '../../model';

const { Text } = Typography;

const DetailsButton = styled(Button)`
  height: 15px;
  padding: 0px;
`;

// const ListItemCell: React.FC<any> = props => (
//   <Col xs={24} sm={4} md={4} lg={4} xl={4}>
//     {props.children}
//   </Col>
// );

const AirplaneImg = styled.img<{ isNonStop: boolean }>(
  ({ isNonStop }: any) => `
width: 100%;
    height: auto;
    ${isNonStop &&
      `
    opacity: 0.85;
    transform: scale(0.6);
    `}
`
);

export function FlightDeltailsListItem({
  name,
  flightNo,
  origin,
  destination,
  arrivalTime,
  departureTime,
  price,
  date,
  stops,
  isDetailedItem
}: FlightDetails) {
  // const isExtraSmallScreen = useMediaQuery(extraSmallScreenQuery);
  const { showDetails, toggleDetails } = useMultipleFlightDetails();
  const departure = moment(`${date}, ${departureTime}`, 'YYYY/MM/DD, HH:mm');
  const arrival = moment(`${date}, ${arrivalTime}`, 'YYYY/MM/DD, HH:mm');
  const isNonStop = !stops || !stops.length;
  const duration = moment.duration(arrival.diff(departure));
  const timeDuration = getDurationInString(duration);

  const multipleDetails =
    showDetails &&
    stops &&
    !isNonStop &&
    stops.map((stopdetail, index) => (
      <div>
        <FlightDeltailsListItem {...stopdetail} isDetailedItem={true} />
        {index !== stops.length - 1 && (
          <LayOverDuration
            currentArrivalTime={moment(
              `${stopdetail.date}, ${stopdetail.arrivalTime}`,
              'YYYY/MM/DD, HH:mm'
            )}
            nextDepartureTime={moment(
              `${stops[index + 1].date}, ${stops[index + 1].departureTime}`,
              'YYYY/MM/DD, HH:mm'
            )}
          />
        )}
      </div>
    ));

  return (
    <div key={'' + name + flightNo + price}>
      <Card
        css={
          isDetailedItem &&
          css`
            background: #ececec;
          `
        }
      >
        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
          <FlexRow
            css={css`
              align-items: center;
            `}
          >
            <Col xs={6} sm={4} md={6} lg={6} xl={4}>
              <AirplaneImg
                src={isNonStop ? directAirplaneIcon : multipleFlightIcon}
                alt="flight icon"
                isNonStop={isNonStop}
              />
            </Col>
            <Col span={12}>
              <StyledResponsiveTitle level={4} smallScreenFontSize={16}>
                {isNonStop ? name : 'Multiple'}
              </StyledResponsiveTitle>
              {isNonStop ? (
                <Text type="secondary">{flightNo}</Text>
              ) : (
                <DetailsButton type="link" onClick={toggleDetails}>
                  {showDetails ? 'Hide details' : 'Show details'}
                </DetailsButton>
              )}
            </Col>
          </FlexRow>
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Col span={8}>
            <StyledResponsiveTitle level={4} smallScreenFontSize={16}>
              {departure.format('HH:mm')}
            </StyledResponsiveTitle>
            <Text type="secondary">{origin}</Text>
          </Col>
          <Col span={8}>
            <StyledResponsiveTitle level={4} smallScreenFontSize={16}>
              {arrival.format('HH:mm')}
            </StyledResponsiveTitle>
            <Text type="secondary">{destination}</Text>
          </Col>
          <Col span={8}>
            <StyledResponsiveTitle
              level={4}
              smallScreenFontSize={16}
              css={css`
                color: green;
              `}
            >
              {timeDuration}
            </StyledResponsiveTitle>
            <Text type="secondary">
              {isNonStop ? 'Non stop' : 'Total duration'}
            </Text>
          </Col>
        </Col>

        {!isDetailedItem && (
          <Col xs={24} sm={24} md={4} lg={4} xl={4}>
            <Col span={18}>
              <Text type="danger">{`\u20B9 ${price}`}</Text>
            </Col>
            <Col span={6}>
              <Button type="danger">Book</Button>
            </Col>
          </Col>
        )}
      </Card>
      {multipleDetails}
    </div>
  );
}
