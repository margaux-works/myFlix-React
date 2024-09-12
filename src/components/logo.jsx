import React from 'react';
import logo from '../assets/logosvg.svg';

export const Logo = ({ position }) => {
  const logoStyles = {
    center: {
      display: 'block',
      margin: 'auto',
      width: '50px',
      height: 'auto',
      marginTop: '1rem',
    },
    left: {
      display: 'block',
      margin: '1rem 0',
      width: '50px',
      height: 'auto',
    },
  };

  return <img src={logo} alt="App Logo" style={logoStyles[position]} />;
};
