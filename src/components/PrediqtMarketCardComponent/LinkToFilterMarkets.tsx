import React from 'react';
import styled from 'styled-components';

import { LinkToFilterMarketsProps } from '../../interfaces';

const Wrapper = styled.a`
  display: flex;
  width: fit-content;
  align-items: center;
  height: 20px;
  padding: 0 10px;
  border-radius: 20px;
  font-weight: 600;
  letter-spacing: 0.2px;
  text-transform: uppercase;
  transition: 0.3s color, 0.3s border-color;

  ${({ theme }) => `
    font: 10px ${theme.fonts.workSans};
    border: thin solid ${theme.colors.contextDarkBlue};
    color: ${theme.colors.contextDarkBlue};
    
    &:hover, &:focus {
      color: ${theme.colors.contextMint};
      border-color: ${theme.colors.contextMint};
    }
  `}
`;

export const LinkToFilterMarkets: React.FC<LinkToFilterMarketsProps> = function({ param, className }) {
  const { type, value } = param;
  const url = `https://prediqt.everipedia.org/markets/${type}/${encodeURI(value.toLowerCase())}`;

  return (
    <Wrapper href={url} className={className}>
      {value}
    </Wrapper>
  );
};
