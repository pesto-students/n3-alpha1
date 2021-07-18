import './authmodal.scss';
import 'design-system/scss/index.scss';
import { useAuth, useUser } from 'reactfire';
import clsx from 'clsx';
import firebase from 'firebase';
import React from 'react';

import Icon from 'design-system/components/common/icons/Icon';
import BaseModal, {
  BaseModalProps,
} from 'design-system/components/common/modal/BaseModal';
import { Button } from 'design-system';
import { useAppDispatch } from 'hooks/useRedux';
import { getCartThunk } from 'store/cartSlice';

function AuthModal(props: Omit<BaseModalProps, 'children'>) {
  const auth = useAuth();
  const { data: user } = useUser();
  const { displayName, photoURL } = user || {};
  const firstName = displayName?.split(' ')?.[0];
  const isSignedOut = !user;

  const dispatch = useAppDispatch();

  const { isOpen, onRequestClose, ...restProps } = props;
  const icon = <Icon name="arrow-right" size={24} />;

  const handleSignIn = async () => {
    await auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());

    const token = await auth?.currentUser?.getIdToken(true);

    if (token) {
      localStorage.setItem('@token', token);
      dispatch(getCartThunk());
    }
  };

  return (
    <>
      <BaseModal
        contentLabel={isSignedOut ? "Let's Party" : 'Welcome to the party'}
        onRequestClose={onRequestClose}
        isOpen={isOpen}
        {...restProps}
      >
        <div
          className={clsx(
            'rf-auth-modal-wrapper',
            'rf-flex',
            'rf-al-c',
            'rf-ju-c'
          )}
        >
          {isSignedOut ? (
            <>
              <div>
                <h2>Sign Up or Login</h2>
                <h4>To your account</h4>
              </div>
              <div className="rf-auth-modal-action">
                <Button onClick={handleSignIn} righticon={icon}>
                  Continue with Google
                </Button>
                <div
                  className={clsx(
                    '.rf-text-sm',
                    'rf-flex',
                    'rf-flex-h',
                    'rf-al-c',
                    'rf-ju-c'
                  )}
                >
                  <Icon name="google" />
                  <p>Use your Google Account to quickly signup or login.</p>
                </div>
              </div>
            </>
          ) : (
            <>
              <div
                className={clsx(
                  'rf-auth-modal-header',
                  'rf-flex',
                  'rf-al-c',
                  'rf-ju-c'
                )}
              >
                {photoURL && <img src={photoURL} alt="profile avatar" />}
                <h2>Hey {firstName}!</h2>
                <h4>Your account is all set.</h4>
              </div>
              <div className="rf-auth-modal-action">
                <Button onClick={onRequestClose!}>Continue Shopping</Button>
              </div>
            </>
          )}
        </div>
      </BaseModal>
    </>
  );
}

export default AuthModal;
