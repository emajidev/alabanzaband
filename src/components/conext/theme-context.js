import React from 'react';

export const themes = {
    light: {
      text: '#000',
      bg: '#eeeeee',
    },
    dark: {
      text: '#fff',
      bg: '#222222',
    },
    yellow: {
      text: '#000',
      bg: '#ef5',
    },
    red: {
      text: '#fff',
      bg: '#f43',
    },
    ice: {
      text: '#fff',
      bg: '#56f',
    },
    ping:{
      text: '#fff',
      bg: '#E884D9',
    },
    green:{
      text: '#fff',
      bg: '#4BB354',
    },
    turquesa:{
      text: '#fff',
      bg: '#2CB3B1',
    },
    celestial:{
      text: '#fff',
      bg: '#0085B8',
    },
    creativo:{
      text: '#fff',
      bg: '#7400B8',
    },
    tinto:{
      text: '#fff',
      bg: '#B80026',
    },
    armonia:{
      text: '#fff',
      bg: '#FFB81A',
    }

  };
  
  export const ThemeContext = React.createContext(
    themes.light // valor por defecto
  );