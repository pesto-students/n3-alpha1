import React from 'react';
import { useAuth, AuthCheck } from 'reactfire';
import firebase from 'firebase';

function LogInForm() {
  const auth = useAuth();

  const signIn = async () => {
    await auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  };

  const signOut = async () => {
    await auth.signOut();
  };

  return (
    <AuthCheck
      fallback={
        <button className="button is-primary" onClick={signIn} type="button">
          Sign In
        </button>
      }
    >
      <button className="button is-info" onClick={signOut} type="button">
        Sign Out
      </button>
    </AuthCheck>
  );
}

export default LogInForm;
