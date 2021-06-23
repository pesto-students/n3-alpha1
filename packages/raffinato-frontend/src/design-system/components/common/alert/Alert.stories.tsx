/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Meta } from '@storybook/react';
import Button from 'design-system/components/common/form/Button';
import { useAppDispatch } from 'util/hooks/useRedux';
import { createAlert } from 'store/alertSlice';
import AlertContainer from './AlertContainer';

export default {
  title: 'Components/common/Alert',
  component: AlertContainer,
} as Meta;

export const Primary: React.VFC<{
  type: string;
}> = (args) => {
  const dispatch = useAppDispatch();

  const handleSuccessClick = () => {
    dispatch(
      createAlert({
        message: 'Logged In',
        type: 'success',
      })
    );
  };

  const handleErrorClick = () => {
    dispatch(
      createAlert({
        message: 'Please check your password',
        type: 'failure',
      })
    );
  };

  return (
    <>
      <AlertContainer />
      <Button responsive={false} onClick={handleSuccessClick}>
        Show success Alert
      </Button>
      <Button responsive={false} onClick={handleErrorClick}>
        Show failure Alert
      </Button>
    </>
  );
};
