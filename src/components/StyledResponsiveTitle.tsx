import React, { useMemo, memo } from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Typography } from 'antd';
import { useSmallScreenMediaQuery } from '../hooks';

const { Title } = Typography;

export const titleStyles = css`
  && {
    margin-bottom: 0px;
  }
`;

type StyledResponsiveTitleProps = {
  readonly smallScreenFontSize: number;
  readonly level?: 1 | 2 | 3 | 4;
};

export const StyledResponsiveTitle: React.FC<StyledResponsiveTitleProps> = memo(
  ({ level, smallScreenFontSize, children, ...props }) => {
    const isSmallScreen = useSmallScreenMediaQuery();

    // memoize the styles on isSmallScreen value
    const styles = useMemo(() => {
      return (
        isSmallScreen &&
        smallScreenFontSize &&
        css`
          && {
            font-size: ${smallScreenFontSize}px;
          }
        `
      );
    }, [isSmallScreen, smallScreenFontSize]);

    return (
      <Title css={css(titleStyles, styles)} level={level} {...props}>
        {children}
      </Title>
    );
  }
);
