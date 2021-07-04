import React from 'react';

import { Icon } from 'design-system/index';

import './chip.scss';
import clsx from 'clsx';

type ChipProps = {
  label: string;
  icon: string;
  disabled?: boolean;
  hint?: string;
};

function Chip({ label, icon, disabled = false, hint }: ChipProps) {
  return (
    <div
      className={clsx('rf-chip-wrapper', 'rf-flex', 'rf-flex-h', 'rf-flex-c', {
        'rf-chip-wrapper--disabled': disabled,
      })}
    >
      <Icon name={icon} />
      <p className="rf-text-sm">{label}</p>
      {hint && <p className="rf-chip-hint">{hint}</p>}
    </div>
  );
}

export default Chip;
