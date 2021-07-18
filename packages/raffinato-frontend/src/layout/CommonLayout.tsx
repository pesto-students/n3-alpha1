import 'design-system/scss/index.scss';
import { Route } from 'react-router-dom';
import { useUser } from 'reactfire';
import React, { useState } from 'react';

import { Navbar } from 'design-system';
import AuthModal from 'components/modals/AuthModal';

function CommonLayout() {
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const { data } = useUser();

  const signInCallback = () => {
    if (!data) {
      setIsAccountModalOpen(true);
    }
  };

  const handleModalClose = () => setIsAccountModalOpen(false);

  return (
    <>
      {/* Global navbar */}
      <Route path="/" exact>
        <Navbar theme="light" signInCallback={signInCallback} />
      </Route>
      <Route path="/:other+" exact>
        <Navbar theme="dark" signInCallback={signInCallback} />
      </Route>
      <AuthModal
        onRequestClose={handleModalClose}
        isOpen={isAccountModalOpen}
      />
    </>
  );
}

export default CommonLayout;
