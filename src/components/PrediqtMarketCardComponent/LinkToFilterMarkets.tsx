import React from 'react';
import styled, { css } from 'styled-components';

import { LinkToFilterMarketsProps, RelatedMarketsProp } from '../../interfaces';

import { CONTENT_MAX_WIDTH, PREDIQT_SITE_URL } from '../../constants';

const overflowEllipsis = css`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Wrapper = styled.a<RelatedMarketsProp>`
  display: block;
  width: fit-content;
  align-items: center;
  height: 20px;
  max-width: 100%;
  padding: 1px 14px;
  border: 1px solid #ffffff;
  border-radius: 12px;
  letter-spacing: 0.24px;
  text-transform: uppercase;
  transition: 0.3s color, 0.3s border-color;
  text-decoration: none;
  color: #ffffff;

  ${({ isRelatedMarkets, theme }) => `
    font: ${isRelatedMarkets ? 12 : 14}px ${theme.fonts.workSans};
    
    &:hover, &:focus {
      color: ${theme.colors.contextMint};
      border-color: ${theme.colors.contextMint};
    }
  `};

  font-weight: 500;
  ${overflowEllipsis};

  @media (max-width: ${CONTENT_MAX_WIDTH}px) {
    padding: 2px 14px;
    font-size: 12px;
  }
`;

export const LinkToFilterMarkets: React.FC<LinkToFilterMarketsProps> = function({
  isRelatedMarkets,
  param,
  className,
}) {
  const { type, value } = param;
  const url = `${PREDIQT_SITE_URL}markets/${type}/${encodeURI(value.toLowerCase())}`;

  return (
    <Wrapper href={url} className={className} isRelatedMarkets={isRelatedMarkets}>
      {value}
    </Wrapper>
  );
};
