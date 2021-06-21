import { useAppDispatch } from 'hooks/useRedux';
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

import { Alert as AlertType, removeAlert } from 'store/alertSlice';

const DISMISS_TIME = 3000;

function Alert({ id, message, type }: AlertType) {
  const dispatch = useAppDispatch();
  const typeClassName = `rf-alert-type-${type}`;

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(removeAlert({ id }));
    }, DISMISS_TIME);

    return () => {
      clearTimeout(timer);
    };
  }, [dispatch, id]);

  const finalClassName = ['rf-alert-base', typeClassName].join(' ');

  return (
    <motion.div
      className={finalClassName}
      initial={{ x: 500 }}
      animate={{ x: 0 }}
      exit={{ x: 500 }}
    >
      <span>{message}</span>
    </motion.div>
  );
}
export default Alert;
