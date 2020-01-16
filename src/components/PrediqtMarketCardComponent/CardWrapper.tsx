import React from 'react';
import { ThemeProvider } from 'styled-components';

import { theme, GlobalStyles } from '../../styles';

import { MarketCardProps } from '../../interfaces';

import { MarketCard } from './MarketCard';

export const CardWrapper: React.FC<MarketCardProps> = function({ id }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <MarketCard id={id} />
    </ThemeProvider>
  );
};
