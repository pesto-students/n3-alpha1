import React from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useHistory } from 'react-router';

import { ContainerBox, TextInput, Button, Icon } from 'design-system/index';
import { createAlert } from 'store/alertSlice';
import { useAppDispatch } from 'hooks/useRedux';
import transition from 'lib/animation';
import useForm from 'hooks/useForm';
import './contact.scss';

const icon = <Icon name="arrow-right" size={24} />;

type ContactDetails = {
  name: string;
  email: string;
  query: string;
};

const validate = (values: Partial<ContactDetails>) => {
  const errorObject: Partial<ContactDetails> = {};

  if (!values.name) {
    errorObject.name = 'Please add your name.';
  }

  if (!values.email) {
    errorObject.email = 'Please add email.';
  }

  if (!values.query) {
    errorObject.query = 'Please add your query.';
  }

  return errorObject;
};

function Contact() {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const handleFormSubmit = () => {
    history.push('/shop');
    dispatch(
      createAlert({
        message: "We'll get back to you soon",
        type: 'success',
      })
    );
  };

  const { errors, values, handleChange, handleSubmit } = useForm<
    Partial<ContactDetails>
  >({}, { onSubmit: handleFormSubmit, validate });

  return (
    <motion.div className={clsx('rf-page', 'rf-contact-page')}>
      {/* <div
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
      </div> */}
      <motion.div
        className={clsx(
          'rf-about-page-intro',
          'rf-flex',
          'rf-flex-h',
          'rf-ju-c'
        )}
        exit={{ opacity: 0 }}
        initial={{
          y: '101%',
        }}
        animate={{
          y: 20,
        }}
        transition={transition}
      >
        <div className="rf-about-page-intro-box">
          <h1 className="rf-about-page-intro-box-title">Raffinato Apparel</h1>
          <h2 className="rf-about-page-intro-box-subtitle">
            Luxury Clothing Store
          </h2>
        </div>
      </motion.div>

      <motion.div
        className={clsx(
          'rf-contact-us-form',
          'rf-flex',
          'rf-flex-h',
          'rf-ju-c'
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={transition}
        exit={{ opacity: 0 }}
      >
        <ContainerBox title="Contact Us">
          <div className="rf-address-page-form-sections">
            <form>
              <div
                className={clsx(
                  'rf-address-page-add-section',
                  'rf-flex',
                  'rf-ju-c'
                )}
              >
                <p className="rf-text-sm">
                  Give us your details. We&apos;re all ears.
                </p>
                <TextInput
                  name="name"
                  onChange={handleChange}
                  value={values.name}
                  error={errors?.name}
                  placeholder="Enter your name"
                />
                <TextInput
                  name="email"
                  onChange={handleChange}
                  value={values.email}
                  error={errors?.email}
                  placeholder="Enter email"
                />
                <TextInput
                  name="query"
                  onChange={handleChange}
                  value={values.query}
                  error={errors?.query}
                  placeholder="Enter query"
                />
              </div>
              <Button onClick={handleSubmit} righticon={icon}>
                Continue
              </Button>
            </form>
          </div>
        </ContainerBox>
      </motion.div>
    </motion.div>
  );
}

export default Contact;
