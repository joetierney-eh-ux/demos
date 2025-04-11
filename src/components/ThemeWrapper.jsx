import React from 'react';
import { useTheme } from './ThemeContext';

const ThemeWrapper = ({ children }) => {
  const { theme } = useTheme();

  return (
    <div className={'app-wrapper ' + theme} style={{'colorScheme': theme}}>
      <main className={'app-content'}>{children}</main>
    </div>
  );
};

export default ThemeWrapper;