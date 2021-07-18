import React, { useState, useEffect } from 'react';

import './splashScreen.scss';

function SplashScreen() {
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setLoadingProgress((prevProgress) =>
        prevProgress < 80 ? prevProgress + 10 : prevProgress
      );
    }, 100);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="rf-splash-screen">
      <div className="rf-splash-content">
        <h1>Raffinato</h1>
        <div className="rf-splash-screen-loading-background">
          <div
            className="rf-splash-screen-loading-foreground"
            style={{
              width: `${loadingProgress}%`,
            }}
          />
          <span>{loadingProgress}%</span>
        </div>
      </div>
    </div>
  );
}

export default SplashScreen;
