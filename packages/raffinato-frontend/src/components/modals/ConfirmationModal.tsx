/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import clsx from 'clsx';
import React from 'react';

import BaseModal, {
  BaseModalProps,
} from 'design-system/components/common/modal/BaseModal';
import { Button } from 'design-system';
import './confirmation-modal.scss';
import 'design-system/scss/index.scss';

type ConfirmationModalProps = Omit<BaseModalProps, 'children'> & {
  onConfirmClick?: () => void;
  confirmLabel: string;
  declineLabel: string;
  confirmSublabel: string;
};

function ConfirmationModal(props: ConfirmationModalProps) {
  const {
    isOpen,
    confirmLabel,
    declineLabel,
    onRequestClose,
    confirmSublabel,
    onConfirmClick,
    contentLabel,
    ...restProps
  } = props;

  return (
    <>
      <BaseModal
        contentLabel={contentLabel || 'Are you sure?'}
        onRequestClose={onRequestClose}
        isOpen={isOpen}
        {...restProps}
      >
        <div
          className={clsx(
            'rf-confirm-modal-wrapper',
            'rf-flex',
            'rf-al-c',
            'rf-ju-c'
          )}
        >
          <p>{confirmSublabel}</p>
          <div
            className={clsx('rf-confirm-modal-action', 'rf-flex', 'rf-flex-h')}
          >
            <Button variant="secondary" onClick={onRequestClose}>
              {declineLabel}
            </Button>
            <Button theme="danger" onClick={onConfirmClick}>
              {confirmLabel}
            </Button>
          </div>
        </div>
      </BaseModal>
    </>
  );
}

export default ConfirmationModal;
