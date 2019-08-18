import React, { useMemo } from 'react';
import styled from '@emotion/styled';

import { Typography } from 'antd';
import moment, { Moment } from 'moment';
import { getDurationInString } from '../../utils';

const { Text } = Typography;

type LayOverDurationProps = {
  readonly currentArrivalTime: Moment;
  readonly nextDepartureTime: Moment;
};

const LayoverDurationContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  background: #ececec;
  height: 30px;
`;

const LayoverText = styled(Text)`
  border: 1px dashed gray;
  padding: 4px 25px;
  width: 200px;
  background: white;
  z-index: 1;
`;

const DashedLine = styled.div`
  position: absolute;
  top: 15px;
  border-bottom: 1px dashed gray;
  width: 100%;
`;

export function LayOverDuration({
  currentArrivalTime,
  nextDepartureTime
}: LayOverDurationProps) {
  const duration = moment.duration(nextDepartureTime.diff(currentArrivalTime));
  return (
    <LayoverDurationContainer>
      <DashedLine />
      <LayoverText type="secondary">{`Layover time ${getDurationInString(
        duration
      )}`}</LayoverText>
    </LayoverDurationContainer>
  );
}
