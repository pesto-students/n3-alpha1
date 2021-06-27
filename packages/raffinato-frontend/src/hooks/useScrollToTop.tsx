import { useLocation } from 'react-router-dom';
import { useLayoutEffect } from 'react';

import usePrevious from 'hooks/usePrevious';

function useScrollToTop() {
  const { pathname } = useLocation();
  const previousPathname = usePrevious(pathname);

  useLayoutEffect(() => {
    if (pathname === previousPathname) {
      return;
    }

    window.scrollTo({ top: 0, left: 0 });
  }, [pathname, previousPathname]);
}

export default useScrollToTop;
