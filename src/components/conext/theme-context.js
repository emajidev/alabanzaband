import React from 'react';

export const themes = {
    light: {
      text: '#fff',
      bg: '#eeeeee',
    },
    dark: {
      text: '#fff',
      bg: '#222222',
    },
    yellow: {
      text: '#fff',
      bg: '#ef3',
    },
    red: {
      text: '#fff',
      bg: '#f44b',
    },
    ice: {
      text: '#fff',
      bg: '#56f',
    },
  };
  
  export const ThemeContext = React.createContext(
    themes.light // valor por defecto
  );