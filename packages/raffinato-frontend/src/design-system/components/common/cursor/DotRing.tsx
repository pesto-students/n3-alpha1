import React, { useState, useEffect } from 'react';
import clsx from 'clsx';

import useMousePosition from 'hooks/useMousePosition';
import './dotring.scss';

const isMobile = () => {
  const ua = navigator.userAgent;
  return /Android|Mobi/i.test(ua);
};

const DotRing = () => {
  const { x, y } = useMousePosition();
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const [hidden, setHidden] = useState(false);

  const onMouseDown = () => setClicked(true);
  const onMouseUp = () => setClicked(false);
  const onMouseLeave = () => setHidden(true);
  const onMouseEnter = () => setHidden(false);

  const addEventListeners = () => {
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
  };

  const removeEventListeners = () => {
    document.removeEventListener('mouseenter', onMouseEnter);
    document.removeEventListener('mouseleave', onMouseLeave);
    document.removeEventListener('mousedown', onMouseDown);
    document.removeEventListener('mouseup', onMouseUp);

    document.querySelectorAll('a').forEach((el) => {
      el.removeEventListener('mouseover', () => setLinkHovered(true));
      el.removeEventListener('mouseout', () => setLinkHovered(false));
    });

    document.querySelectorAll('p').forEach((el) => {
      el.removeEventListener('mouseover', () => setLinkHovered(true));
      el.removeEventListener('mouseout', () => setLinkHovered(false));
    });
  };

  const handleLinkHoverEvents = () => {
    document.querySelectorAll('a').forEach((el) => {
      el.addEventListener('mouseover', () => setLinkHovered(true));
      el.addEventListener('mouseout', () => setLinkHovered(false));
    });

    document.querySelectorAll('p').forEach((el) => {
      el.addEventListener('mouseover', () => setLinkHovered(true));
      el.addEventListener('mouseout', () => setLinkHovered(false));
    });
  };

  useEffect(() => {
    if (!isMobile()) {
      addEventListeners();
      handleLinkHoverEvents();
    }
    return () => {
      if (!isMobile()) removeEventListeners();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cursorClasses = clsx('ring', {
    'ring--clicked': clicked,
    'ring--hidden': hidden,
    'ring--link-hovered': linkHovered,
  });

  if (typeof navigator !== 'undefined' && isMobile()) return null;

  return (
    <>
      <div
        style={{ left: `${x}px`, top: `${y}px` }}
        className={cursorClasses}
      />
    </>
  );
};

export default DotRing;
