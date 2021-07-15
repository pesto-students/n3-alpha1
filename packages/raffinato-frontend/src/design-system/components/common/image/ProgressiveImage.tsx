import React, { useEffect, useState } from 'react';

import DEFAULT_PLACEHOLDER from 'design-system/assets/images/gallery-placeholders/placeholder.jpeg';

type ProgressiveImageProps = {
  src: string;
  alt?: string;
  className?: string;
};

function ProgressiveImage({ src, className, alt = '' }: ProgressiveImageProps) {
  const [loading, setLoading] = useState(true);
  const [currentSrc, setCurrentSrc] = useState(DEFAULT_PLACEHOLDER);

  useEffect(() => {
    // start loading original image
    const imageToLoad = new Image();
    imageToLoad.src = src;
    imageToLoad.onload = () => {
      setCurrentSrc(src);
      setLoading(false);
    };
  }, [src]);

  return (
    <img
      src={currentSrc}
      className={className}
      style={{
        filter: loading ? 'brightness(0.8) opacity(0.5)' : '',
      }}
      alt={alt}
    />
  );
}

export default ProgressiveImage;
