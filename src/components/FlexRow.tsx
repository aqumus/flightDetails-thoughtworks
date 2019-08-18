import React from 'react';
import { Row } from 'antd';
/** @jsx jsx */
import { jsx, css } from '@emotion/core';

export const FlexRow: React.FC = ({ children, ...props }) => {
  return (
    <Row
      type="flex"
      css={css({
        flexGrow: 1
      })}
      {...props}
    >
      {children}
    </Row>
  );
};
