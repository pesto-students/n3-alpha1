import React from 'react';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

const ProductGalleryMobile = (props: { images: string[] }) => {
  const { images } = props;

  return (
    <div className="rf-product-gallery-mobile">
      {images.map((image) => {
        return (
          <Zoom key={image}>
            <img alt="" src={image} />
          </Zoom>
        );
      })}
    </div>
  );
};

export default ProductGalleryMobile;
