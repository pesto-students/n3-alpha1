import React from 'react';
import Modal, { Styles } from 'react-modal';
import type { ReactNode } from 'react';

import Icon from 'design-system/components/Icon/Icon';
import './modal.scss';

// const StyledModalInnerWrapper = styled('div')`
//   display: flex;
//   justify-content: space-around;
//   flex-direction: column;
//   align-items: center;
//   height: 100%;
//   position: relative;

//   & .row {
//     width: 100%;
//     display: flex;

//     & .column {
//       width: 50%;
//       padding: 10px;
//       color: #81878c;

//       &:first-child {
//         text-align: right;
//         color: initial;
//       }
//     }
//   }

//   & .header {
//     font-size: 18px;
//   }

//   & .modalCloseButton {
//     background: none;
//     border: none;
//     outline: none;
//     position: absolute;
//     right: 10px;
//     top: 8px;
//     cursor: pointer;
//   }
// `;

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
    height: '400px',
    width: '650px',
    background: '#FCFAF7',
    padding: '40px 64px',
  },
};

type ModalProps = Modal.Props & {
  children: ReactNode;
  contentStyle?: Record<string, any>;
};

function BaseModal({
  isOpen,
  onRequestClose,
  contentLabel,
  children,
  contentStyle,
}: ModalProps) {
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
