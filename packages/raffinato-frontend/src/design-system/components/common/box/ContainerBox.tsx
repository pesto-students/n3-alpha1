import clsx from 'clsx';
import React, { ReactNode } from 'react';
import './containerBox.scss';

type ContainerBoxProps = {
  children: ReactNode;
  title: string;
  icon?: ReactNode;
};

function ContainerBox({ children, title, icon }: ContainerBoxProps) {
  return (
    <div className="rf-container-box-wrapper">
      <div
        className={clsx('rf-container-box-header', 'rf-flex', 'rf-flex-h', {
          'rf-ju-sb': Boolean(icon),
        })}
      >
        <h3>{title}</h3>
        {icon}
      </div>
      {children}
    </div>
  );
}

export default ContainerBox;
