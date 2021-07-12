import React, { useState, useEffect, MouseEvent, useMemo } from 'react';
import clsx from 'clsx';

import throttle from 'lodash/throttle';

import useMousePosition from 'hooks/useMousePosition';

import './dotring.scss';

type DotRingProps = {
  cursorType?: string;
};

const isMobile = () => {
  const ua = navigator.userAgent;
  return /Android|Mobi/i.test(ua);
};

const DotRing = ({ cursorType }: DotRingProps) => {
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

  const handleMouseOver = (e: MouseEvent) => {
    if (e?.currentTarget?.tagName?.toLowerCase() === 'a') {
      setLinkHovered(true);
    }
  };

  const handleMouseOverThrottled = useMemo(
    () => throttle(handleMouseOver, 1000),
    []
  );

  const handleMouseOut = (e: MouseEvent) => {
    if (e?.currentTarget?.tagName?.toLowerCase() === 'a') {
      setLinkHovered(false);
    }
  };

  const handleMouseOutrThrottled = useMemo(
    () => throttle(handleMouseOut, 1000),
    []
  );

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
    addEventListeners();
    handleLinkHoverEvents();
    return () => removeEventListeners();
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
