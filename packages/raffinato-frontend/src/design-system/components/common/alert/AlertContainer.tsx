import React from 'react';
import { AnimatePresence } from 'framer-motion';

import Alert from 'design-system/components/common/alert/Alert';
import Portal from 'design-system/components/common/portal/Portal';
import { useAppSelector } from 'util/hooks/useRedux';

import './alert.scss';

const DEFAULT_ALERT_CONTAINER_POSITION = 'bottom-right';
const ALERT_POSTION_TO_FLEX_CLASSNAME_MAP = {
  'bottom-right': 'rf-flex.rf-flex-vr',
  'bottom-left': 'rf-flex.rf-flex-vr',
  'top-right': 'rf-flex.rf-flex-v',
  'top-left': 'rf-flex.rf-flex-v',
};

type AlertProps = {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
};

function AlertContainer({
  position = DEFAULT_ALERT_CONTAINER_POSITION,
}: AlertProps) {
  const alerts = useAppSelector((state) => state.alert);

  const typeClassName = `rf-alert-container-pos-${position}`;

  const finalClassName = [
    ALERT_POSTION_TO_FLEX_CLASSNAME_MAP[DEFAULT_ALERT_CONTAINER_POSITION],
    'rf-alert-container-base',
    typeClassName,
  ].join(' ');

  return (
    <Portal>
      <div className={finalClassName}>
        <AnimatePresence>
          {alerts.map((alert) => (
            <Alert key={alert.id} {...alert} />
          ))}
        </AnimatePresence>
      </div>
    </Portal>
  );
}

export default AlertContainer;
