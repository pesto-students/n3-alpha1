/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';

import { Button } from 'design-system';
import HeroImage from 'design-system/assets/images/hero@2x.png';
import HeroImage2 from 'design-system/assets/images/hero2@2x.png';
import './home.scss';
// import PropTypes from 'prop-types';

export const heroData = [
  {
    image: HeroImage,
    title: 'For those who live life on their own terms',
    subtitle: '...AND LOOK DAMN GOOD IN IT • THE PROTAGONISTS',
  },
  {
    image: HeroImage2,
    title: 'For those who are spoilt by choices',
    subtitle: '...AND YET MAKE THE CORRECT ONE • THE PERFECTIONISTS',
  },
];

const variants = {
  enter: {
    opacity: 0,
  },
  center: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

const sentence = {
  hidden: { opacity: 0.5 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.3,
      staggerChildren: 0.08,
    },
  },
};

const letter = {
  hidden: { x: -20 },
  visible: {
    x: 0,
  },
};

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

const Home = () => {
  const [[page, direction], setPage] = useState([0, 0]);

  const history = useHistory();

  const imageIndex = wrap(0, heroData.length, page);

  const paginate = useCallback(
    (newDirection: number) => {
      setPage([page + newDirection, newDirection]);
    },
    [page]
  );

  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 8000);

    return () => clearInterval(timer);
  }, [paginate]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="rf-homepage"
    >
      <section className="rf-hero rf-position-r rf-flex rf-al-c rf-ju-c">
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={page}
            className="rf-hero-img"
            src={heroData[imageIndex].image}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              opacity: { duration: 1 },
              delay: 3000,
            }}
          />
        </AnimatePresence>
        {/* <img alt="" className="rf-hero-img" src={HeroImage} /> */}
        <div className="rf-hero-message">
          <motion.h1
            className="rf-italiana rf-text-white"
            initial="hidden"
            animate="visible"
            variants={sentence}
          >
            {heroData[imageIndex].title.split(' ').map((word, index) => (
              <>
                <motion.span
                  key={`${word}-${index}`}
                  variants={sentence}
                  style={{ display: 'inline-block' }}
                >
                  {word.split('').map((char, charIndex) => (
                    <motion.span
                      key={`${char}-${charIndex}`}
                      variants={letter}
                      style={{
                        display: 'inline-block',
                      }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </motion.span>
                <span> </span>
              </>
            ))}
          </motion.h1>
          <p className="rf-text-white rf-margin-b-xxl">
            {heroData[imageIndex].subtitle}
          </p>
          <Button
            theme="light"
            responsive={false}
            onClick={() => history.push('/shop')}
          >
            Shop now
          </Button>
        </div>
        <div className="hero-scroll-indicator">
          <div className="hero-scroll-indicator-line" />
          <span>scroll for more</span>
        </div>
        <div className="hero-diamond-filler">
          <div />
          <div />
          <div />
        </div>
      </section>
    </motion.div>
  );
};

Home.propTypes = {};

Home.defaultProps = {};

export default Home;
