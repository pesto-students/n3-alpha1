import React, { useEffect } from 'react';
import { useUser } from 'reactfire';

function useRefreshToken() {
  const user = useUser();

  const setToken = async () => {
    const token = await user?.data?.getIdToken();

    if (token) {
      localStorage.setItem('@token', token);
    }
  };

  useEffect(() => {
    setToken();
    // We want to set token only on refresh
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export default useRefreshToken;
