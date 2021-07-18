import clsx from 'clsx';
import React from 'react';

import './skeleton.scss';

type SkeletonProps = {
  count?: number;
  width?: number | string;
  height?: number | string;
  className?: string;
};

function Skeleton({ count = 1, width, height, className }: SkeletonProps) {
  return (
    <span>
      {Array(count)
        .fill(1)
        .map((element, i) => (
          <span
            // Sketelons can't be modified, hence safe to use indexes as key
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            className={clsx('rf-skeleton-loader', className)}
            style={{ width, height }}
          >
            {/* Zero-width non-joiner */}
            &zwnj;
          </span>
        ))}
    </span>
  );
}

export default Skeleton;
