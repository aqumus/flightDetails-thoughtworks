import React from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Typography } from 'antd';
import { FlightDetailsContainer } from './components/FlightDetailsContainer';
import { useMediaQuery, smallScreenQuery } from './hooks';

const { Title } = Typography;

const AppStyles = css`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const App: React.FC = () => {
  const isSmallScreen = useMediaQuery(smallScreenQuery);
  return (
    <div css={AppStyles}>
      <Title
        level={2}
        css={css(
          { paddingLeft: '0.5vw' },
          isSmallScreen &&
            css`
              text-align: center;
            `
        )}
      >
        Flight Search App
      </Title>
      <FlightDetailsContainer />
    </div>
  );
};

export default App;
