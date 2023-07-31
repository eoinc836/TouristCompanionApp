import React from 'react';
import { useMediaQuery } from 'react-responsive';

const ResponsiveLayout = () => {

  const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1224px)' });
  const isTablet = useMediaQuery({ query: '(max-width: 768px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 480px)' });

  return (
    <div>

    </div>
  );
};

export default ResponsiveLayout;
