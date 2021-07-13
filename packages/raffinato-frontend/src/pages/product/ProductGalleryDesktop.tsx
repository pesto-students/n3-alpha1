/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { motion } from 'framer-motion';
import React, { useEffect, useState, useRef } from 'react';

import { Icon } from 'design-system';

const ProductGalleryDesktop = (props: { images: string[] }) => {
  const { images } = props;

  let numOfColumns: number;
  let columnWidthWithMargin: number;
  numOfColumns = 5;
  columnWidthWithMargin = 1920 * 0.2 + 8;
  if (window.innerWidth >= 1920) {
    numOfColumns = 5;
    columnWidthWithMargin = 1920 * 0.2 + 8;
  }
  if (window.innerWidth < 1920) {
    numOfColumns = 4;
    columnWidthWithMargin = (window.innerWidth - 96) * 0.25 + 8;
  }
  if (window.innerWidth < 1680) {
    numOfColumns = 3;
    columnWidthWithMargin = (window.innerWidth - 96) * 0.33 + 8;
  }
  if (window.innerWidth < 1200) {
    numOfColumns = 2;
    columnWidthWithMargin = (window.innerWidth - 48) * 0.5 + 8;
  }

  const [rightClickCount, setRightClickCount] = useState(0);
  const isControllerVisible = numOfColumns < images.length;
  const isRightControllerVisible =
    rightClickCount < images.length - numOfColumns;
  const isLeftControllerVisible = rightClickCount > 0;

  const onRight = () => {
    setRightClickCount(rightClickCount + 1);
  };

  const onLeft = () => {
    setRightClickCount(rightClickCount - 1);
  };

  return (
    <div className="rf-product-page-gallery rf-hide-xs">
      <motion.div
        initial
        animate={{ x: -1 * columnWidthWithMargin * rightClickCount }}
        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        className="rf-gallery-images"
        dragPropagation
      >
        {images.map((image) => {
          return <img alt="" src={image} key={image} />;
        })}
      </motion.div>
      {isControllerVisible ? (
        <>
          {isRightControllerVisible ? (
            <div
              onClick={onRight}
              className="rf-gallery-controller rf-controller-right"
            >
              <Icon name="arrow-right" size={48} fillColor="#000" />
            </div>
          ) : null}
          {isLeftControllerVisible ? (
            <div
              onClick={onLeft}
              className="rf-gallery-controller rf-controller-left"
            >
              <Icon name="arrow-left" size={48} fillColor="#000" />
            </div>
          ) : null}
        </>
      ) : null}
    </div>
  );
};

export default ProductGalleryDesktop;
