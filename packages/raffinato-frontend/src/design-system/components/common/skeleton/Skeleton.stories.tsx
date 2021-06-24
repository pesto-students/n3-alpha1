/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { Meta } from '@storybook/react';
import Button from 'design-system/components/common/form/Button';
import { useAppDispatch } from 'hooks/useRedux';
import { createAlert } from 'store/alertSlice';
import Skeleton from './Skeleton';

export default {
  title: 'Components/common/Skeleton',
  component: Skeleton,
} as Meta;

export const Primary: React.VFC<{
  type: string;
}> = (args) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Button responsive={false} onClick={() => setIsLoading((prev) => !prev)}>
        Toogle Loading
      </Button>
      <div style={{ fontSize: 20, lineHeight: 2 }}>
        {isLoading ? <Skeleton /> : <p>Locked & Loaded</p>}
      </div>
    </>
  );
};
