import React from 'react';
import Modal from 'react-modal';
import type { ReactNode } from 'react';

import Icon from 'design-system/components/common/icons/Icon';
import './modal.scss';

type BaseModalProps = Modal.Props & {
  children: ReactNode;
  contentStyle?: Record<string, any>;
};

function BaseModal({
  isOpen,
  onRequestClose,
  contentLabel,
  children,
  contentStyle,
  ...others
}: BaseModalProps) {
  const modalCloseBbuttonClassName = [
    'rf-flex',
    'rf-al-c',
    'rf-ju-c',
    'rf-basemodal-close-button',
  ].join(' ');

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      parentSelector={() => document.body}
      contentLabel={contentLabel}
      style={{
        content: { ...contentStyle },
      }}
      appElement={document.getElementById('root')!}
      overlayClassName="ReactModal__Overlay"
      className="ReactModal__Content"
      closeTimeoutMS={500}
      {...others}
    >
      <div className="rf-basemodal-wrapper">
        <h2 className="rf-basemodal-header">{contentLabel}</h2>
        <button
          className={modalCloseBbuttonClassName}
          type="button"
          onClick={onRequestClose}
        >
          <Icon isInteractive name="close" size={24} />
        </button>
        {children}
      </div>
    </Modal>
  );
}

export default BaseModal;

export type { BaseModalProps };
