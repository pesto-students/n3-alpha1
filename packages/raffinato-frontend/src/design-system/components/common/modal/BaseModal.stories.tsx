/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { Meta } from '@storybook/react';

import BaseModal from 'design-system/components/common/modal/BaseModal';
import Button from 'design-system/components/common/form/Button';

export default {
  title: 'Components/common/BaseModal',
  component: BaseModal,
} as Meta;

export const Primary: React.VFC<{
  type: string;
}> = (args) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button responsive={false} onClick={() => setIsOpen(true)}>
        Open Modal
      </Button>
      <BaseModal
        isOpen={isOpen}
        contentLabel="Login"
        onRequestClose={() => setIsOpen(false)}
      >
        <p>hi</p>
      </BaseModal>
    </>
  );
};
