import React from 'react';

import './skeleton.scss';

function Skeleton({ count = 1, width, height }: any) {
  return (
    <span>
      {Array(count)
        .fill(1)
        .map((element, i) => (
          <span
            // Sketelons can't be modified, hence safe to use indexes as key
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            className="rf-skeleton-loader"
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
