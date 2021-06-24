/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
import { motion } from 'framer-motion';
import React from 'react';
import { useHistory } from 'react-router';
import { Button } from '../../design-system';
import HeroImage from '../../design-system/assets/images/hero@2x.png';
import './home.scss';
// import PropTypes from 'prop-types';

const Home = () => {
  const history = useHistory();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="rf-homepage"
    >
      <section className="rf-hero rf-position-r rf-flex rf-al-c rf-ju-c">
        <img alt="" className="rf-hero-img" src={HeroImage} />
        <div className="rf-hero-message">
          <h1 className="rf-italiana rf-text-white">
            For those who live life on their own terms
          </h1>
          <p className="rf-text-white rf-margin-b-xxl">
            ...AND LOOK DAMN GOOD IN IT • THE PROTAGONISTS
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
