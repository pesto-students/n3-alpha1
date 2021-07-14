import React from 'react';
import clsx from 'clsx';

import { motion } from 'framer-motion';

import HeroImage from 'design-system/assets/images/hero@2x.png';
import AboutModel from 'design-system/assets/images/about-model.png';

import './about.scss';

function About() {
  return (
    <div className={clsx('rf-page')}>
      <div
        className={clsx(
          'rf-about-page-image-box',
          'rf-flex',
          'rf-flex-h',
          'rf-ju-sa'
        )}
      >
        <motion.img
          className="rf-about-image-box-img"
          src={HeroImage}
          initial={{ y: 30 }}
          animate={{ y: 0 }}
          transition={{ ease: 'easeOut', duration: 0.5 }}
          alt="box"
        />
        <div className={clsx('rf-flex', 'rf-flex-h', 'rf-al-c')}>
          <div className="hero-diamond-filler hero-diamond-filler--static">
            <div />
            <div />
            <div />
          </div>
          <div className="rf-about-image-box-decoration" />
        </div>
      </div>
      <div
        className={clsx(
          'rf-about-page-intro',
          'rf-flex',
          'rf-flex-h',
          'rf-ju-c'
        )}
      >
        <div className="rf-about-page-intro-box">
          <h1 className="rf-about-page-intro-box-title">Raffinato Apparel</h1>
          <h2 className="rf-about-page-intro-box-subtitle">
            Luxury Clothing Store
          </h2>
        </div>
      </div>
      <div
        className={clsx(
          'rf-about-page-image-box-bottom',
          'rf-flex',
          'rf-flex-h',
          'rf-ju-sa',
          'rf-al-e'
        )}
      >
        <span>
          For those who live life on their own terms and look damn good in it -
          for the protagonists.
        </span>
        <motion.img
          className="rf-about-image-box-img-model"
          src={AboutModel}
          initial={{ y: -30 }}
          animate={{ y: 0 }}
          transition={{ ease: 'easeOut', duration: 0.5 }}
          alt="box"
        />
      </div>

      <div className={clsx('rf-about-page-blurb')}>
        <div className="rf-about-page-blurb-box">
          <h4>Vision</h4>
          <span>
            Create a one-stop platform to buy orginal luxury clothing with an
            immersive experience.
          </span>
        </div>
        <div className="rf-about-page-blurb-box">
          <h4>Mission</h4>
          <span>
            Provide an experience that is at par with the quality and aesthetics
            of brands we sell.
          </span>
        </div>
        <div className="rf-about-page-blurb-box">
          <h4>Values</h4>
          <span>
            Strive to continually evolve based on user feedback and build long
            lasting relationships.
          </span>
        </div>
      </div>
    </div>
  );
}

export default About;
