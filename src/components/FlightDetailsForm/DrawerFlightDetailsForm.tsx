import React, { useCallback, useState, useEffect } from 'react';
import { Drawer, Button } from 'antd';
import styled from '@emotion/styled';
import {
  FlightDetailsFormOwnProps,
  FlightDetailsForm
} from './FlightDetailsForm';

const FloatingButton = styled(Button)`
  position: absolute;
  width: 200px;
  top: 92vh;
  margin: 0 auto;
  z-index: 1;
  width: 90vw;
  height: 50px;
`;

type DrawerFlightDetailsFormProps = {
  readonly isSearching: boolean;
};

export const DrawerFlightDetailsForm: React.FC<
  FlightDetailsFormOwnProps & DrawerFlightDetailsFormProps
> = ({ onSubmit, isSearching }) => {
  const [visible, setVisible] = useState(false);
  const onClose = useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  const onOpen = useCallback(() => {
    setVisible(true);
  }, [setVisible]);

  useEffect(() => {
    if (isSearching) {
      setVisible(false);
    }
  }, [isSearching]);

  return (
    <div>
      {!visible && (
        <FloatingButton type="primary" onClick={onOpen}>
          Open flight details form
        </FloatingButton>
      )}
      <Drawer
        title="Flight Details"
        placement={'bottom'}
        closable={true}
        onClose={onClose}
        visible={visible}
        bodyStyle={{
          display: 'flex',
          height: 'auto'
        }}
        height={'auto'}
      >
        <FlightDetailsForm onSubmit={onSubmit} />
      </Drawer>
    </div>
  );
};
