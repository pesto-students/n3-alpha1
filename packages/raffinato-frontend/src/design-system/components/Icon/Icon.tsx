import React from 'react';
import SVG from 'react-inlinesvg';

const reqIcons = require.context('assets/icons', true, /\.(svg|png)$/);

type IconType = 'svg' | 'png';

type IconProps = {
  name: string;
  size?: number;
  strokeColor?: string;
  fillColor?: string;
  type?: IconType;
  isInteractive?: boolean;
};

function Icon({
  name,
  size = 16,
  strokeColor,
  fillColor,
  type = 'svg',
  isInteractive = false,
  ...other
}: IconProps) {
  if (type === 'png') {
    return (
      <img
        src={reqIcons?.(`./${name}.png`)?.default}
        alt="icon"
        style={{
          display: 'inline-block',
          height: size,
          width: size,
          cursor: isInteractive ? 'pointer' : 'initial',
        }}
      />
    );
  }

  return (
    <i
      className="icon"
      style={{
        display: 'inline-block',
        height: size,
        width: size,
        cursor: isInteractive ? 'pointer' : 'initial',
      }}
      {...other}
    >
      <SVG
        style={{
          display: 'block',
          height: size,
          width: size,
          stroke: strokeColor,
          fill: fillColor,
        }}
        src={reqIcons?.(`./${name}.svg`)?.default}
      />
    </i>
  );
}

export default Icon;

export type { IconProps };
