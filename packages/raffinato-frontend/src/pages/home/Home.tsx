/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useCallback, useEffect, useState, Fragment } from 'react';
import { useHistory } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';

import { Button, DotRing } from 'design-system';
import HeroImage from 'design-system/assets/images/hero@2x.png';
import HeroImage2 from 'design-system/assets/images/hero2@2x.png';
import './home.scss';

const HERO_IMAGE_TRANSITION_TIME = 20000;

export const heroData = [
  {
    image: HeroImage,
    title: 'For those who live life on their own terms',
    subtitle: (
      <>
        ...AND LOOK DAMN GOOD IN IT <br className="rf-hide-desktop" />• THE
        PROTAGONISTS <span className="rf-hide-desktop">•</span>
      </>
    ),
  },
  {
    image: HeroImage2,
    title: 'For those who are spoilt by choices',
    subtitle: (
      <>
        ...AND YET MAKE THE CORRECT ONE <br className="rf-hide-desktop" />• THE
        PERFECTIONISTS <span className="rf-hide-desktop">•</span>
      </>
    ),
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

  // todo: proper positioning and darker background image on mobile(maybe import a different image for mobile)
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
    }, HERO_IMAGE_TRANSITION_TIME);

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
            alt="slider"
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
              <Fragment key={`${word}-${index}`}>
                <motion.span
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
              </Fragment>
            ))}
          </motion.h1>
          <motion.p
            className="rf-text-white rf-margin-b-xxl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {heroData[imageIndex].subtitle}
          </motion.p>
          <Button
            theme="light"
            responsive={false}
            onClick={() => history.push('/shop')}
          >
            Shop now
          </Button>
        </div>
        {/* todo: decide whether to remove base on whether grid is ready */}
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
      <DotRing />
    </motion.div>
  );
};

Home.propTypes = {};

Home.defaultProps = {};

export default Home;
