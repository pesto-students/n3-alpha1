import clsx from 'clsx';
import React, { ReactNode } from 'react';
import './containerBox.scss';

type ContainerBoxProps = {
  children: ReactNode;
  title: string;
  icon?: ReactNode;
  headerItem?: ReactNode;
};

function ContainerBox({
  children,
  title,
  icon,
  headerItem,
}: ContainerBoxProps) {
  return (
    <div className="rf-container-box-wrapper">
      <div
        className={clsx('rf-container-box-header', 'rf-flex', 'rf-flex-h', {
          'rf-ju-sb': Boolean(icon || headerItem),
        })}
      >
        <h3>{title}</h3>
        {headerItem}
        {icon}
      </div>
      {children}
    </div>
  );
}

export default ContainerBox;
