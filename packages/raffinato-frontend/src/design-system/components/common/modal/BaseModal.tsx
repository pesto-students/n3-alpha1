import React from 'react';
import Modal, { Styles } from 'react-modal';
import type { ReactNode } from 'react';

import Icon from 'design-system/components/Icon/Icon';
import './modal.scss';

const modalStyles: Styles = {
  overlay: {
    position: 'absolute',
    backgroundColor: 'transparent',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    position: 'absolute',
    top: 'initial',
    left: 'initial',
    bottom: 'initial',
    right: 'initial',
    minHeight: '400px',
    width: '650px',
    background: '#FCFAF7',
    padding: '40px 64px',
    overflow: 'hidden',
  },
};

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
        content: { ...modalStyles.content, ...contentStyle },
        overlay: modalStyles.overlay,
      }}
      closeTimeoutMS={500}
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
