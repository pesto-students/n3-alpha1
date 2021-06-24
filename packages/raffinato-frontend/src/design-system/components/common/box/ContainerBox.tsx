import React, { ReactNode } from 'react';
import './containerBox.scss';

type ContainerBoxProps = {
  children: ReactNode;
  title: string;
};

function ContainerBox({ children, title }: ContainerBoxProps) {
  return (
    <div className="rf-container-box-wrapper">
      <div className="rf-container-box-header">
        <h3>{title}</h3>
      </div>
      {children}
    </div>
  );
}

export default ContainerBox;
