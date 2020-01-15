import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

import { getMarket } from '../../service';
import { cutMarketsCardTitle } from '../../utils';

import { MarketCardProps, Market, RelatedMarketsProp, BackgroundImageProps } from '../../interfaces';

import { ThumbDownIcon, ThumbUpIcon } from '../icons';
import { MarketStateBadge } from './MarketStateBadge';
import { LinkToFilterMarkets } from './LinkToFilterMarkets';

import { PREDIQT_SITE_URL } from '../../constants';

const globalStyles = css`
  &,
  & * {
    @import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700|Work+Sans:400,500,600&display=swap');

    ${({ theme }) => `      
    font-family: ${theme.fonts.openSans}; 
  `}
  }

  &,
  & *,
  & *::after,
  & *::before {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    line-height: normal;
  }

  & div,
  & p,
  & section,
  & article {
    outline: none;
  }
`;

const CardLink = styled.a`
  ${globalStyles};

  text-decoration: none;
`;

const BackgroundShadow = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-image: linear-gradient(to top, rgba(0, 0, 0, 0.7) 35%, 55%, transparent);
`;

const BackgroundImage = styled(BackgroundShadow)<BackgroundImageProps>`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-image: none;
  backface-visibility: hidden;
  transition: transform 0.4s;

  ${({ backgroundURL }) =>
    backgroundURL ? `background: url('${backgroundURL}') center no-repeat; background-size: cover;` : ''}
`;

const Card = styled.article<RelatedMarketsProp>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 0 20px;
  border: 1px solid ${({ theme }) => theme.colors.contextBorderGrey};
  border-radius: 5px;
  color: #ffffff;
  overflow: hidden;
  mask-image: radial-gradient(white, black);

  &:hover ${BackgroundImage}, &:focus ${BackgroundImage} {
    transform: scale(1.15);
  }
  ${({ relatedMarkets }) =>
    relatedMarkets
      ? 'height: 338px;'
      : `
       height: 509px;
       
       @media (max-width: 1124px) {
         height: 338px;
       }`};
`;

const CardTitle = styled.h4<RelatedMarketsProp>`
  margin: 18px 0;
  font-weight: 500;
  line-height: 24px;

  @media (max-width: 1124px) {
    max-height: 80px;
    overflow: hidden;
  }

  ${({ relatedMarkets, theme }) =>
    relatedMarkets
      ? `
    font: 14px ${theme.fonts.workSans};
    `
      : `
    font: 18px ${theme.fonts.workSans};
    
    @media (max-width: 1124px) {
      font-size: 14px;
    }
  `}
`;

const WrappedLinkToFilterMarkets = styled(LinkToFilterMarkets)<RelatedMarketsProp>`
  display: block;
  max-width: 100%;
  padding: 1px 14px;
  border: 1px solid #ffffff;
  border-radius: 12px;
  font-weight: 500;
  letter-spacing: 0.24px;
  color: #ffffff;

  @media (max-width: 1124px) {
    padding: 2px 14px;
  }

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  ${({ relatedMarkets, theme }) =>
    relatedMarkets
      ? `
    font: 12px ${theme.fonts.workSans};`
      : `
    font: 14px ${theme.fonts.workSans};
    
    @media (max-width: 1124px) {
      font-size: 12px;
    }
  `}
`;

const Divider = styled.hr`
  width: 100%;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.25);
  border: 0;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 20px 0;
`;

const FooterLeft = styled.div``;

const YesLine = styled.div`
  display: flex;
  align-items: center;
`;

const NoLine = styled(YesLine)`
  margin-top: 5px;
`;

const YesNoText = styled.p<RelatedMarketsProp>`
  margin-left: 5px;

  font-weight: 600;
  letter-spacing: 0.24px;

  ${({ relatedMarkets }) =>
    relatedMarkets
      ? `
      font-size: 12px;
    `
      : `
      font-size: 14px;
  
      @media (max-width: 1124px) {
        font-size: 12px;
      }
  `}
`;

const Volume = styled.p<RelatedMarketsProp>`
  display: flex;
  align-items: flex-end;

  font-weight: 500;
  letter-spacing: 0.24px;
  line-height: 14px;

  ${({ relatedMarkets, theme }) =>
    relatedMarkets
      ? `
      font: 12px ${theme.fonts.workSans};
    `
      : `
      font: 14px ${theme.fonts.workSans};
    
      @media (max-width: 1124px) {
        font-size: 12px;
      }
    `}
`;

const ThumbIconStyles = css<RelatedMarketsProp>`
  ${({ relatedMarkets }) =>
    relatedMarkets
      ? `
      width: 12px;
      height: 12px;
      `
      : `
      width: 14px;
      height: 14px;

      @media (max-width: 1124px) {
        width: 12px;
        height: 12px;
      }
  `}
`;

const ThumbDown = styled(ThumbDownIcon)`
  ${ThumbIconStyles}
`;

const ThumbUp = styled(ThumbUpIcon)`
  ${ThumbIconStyles}
`;

const CardContent = styled.div`
  z-index: 1;
  max-width: 100%;
`;

const VolumeText = styled.span`
  position: absolute;
  right: 20px;
  bottom: 45px;
`;

const CardIconsWrapper = styled.div`
  position: absolute;
  display: flex;
  top: 20px;
  left: 20px;
  width: 100%;
`;

const MarketError = styled.p`
  font-weight: 500;
  color: #d00020;
`;

const isRelatedMarkets = false;

export const MarketCard: React.FC<MarketCardProps> = function({ id }) {
  const [market, setMarket] = useState<Market | null>(null);
  const [marketError, setMarketError] = useState<string | null>(null);
  const [isMarketLoading, toggleMarketLoading] = useState<boolean>(false);
  const [isCardHovered, toggleCardHovered] = useState<boolean>(false);

  useEffect(function() {
    (async function() {
      toggleMarketLoading(prevMarketLoading => !prevMarketLoading);
      const result = await getMarket(id);
      if (typeof result === 'string') {
        setMarketError(result);
      } else {
        setMarket(result);
      }
      toggleMarketLoading(prevMarketLoading => !prevMarketLoading);
    })();
  }, []);

  function setCardHovered() {
    toggleCardHovered(prevCardHovered => !prevCardHovered);
  }

  if (isMarketLoading) {
    // TODO replace with loader
    return <p>Loading...</p>;
  }
  if (marketError) {
    return <MarketError>marketError</MarketError>;
  }
  if (!market) {
    return null;
  }

  const { volume, limitOrder, ipfs } = market;
  const { imageUrl, title, category } = ipfs;

  return (
    <CardLink href={`${PREDIQT_SITE_URL}market/${id}`} target="_blank">
      <Card
        relatedMarkets={isRelatedMarkets}
        onMouseEnter={setCardHovered}
        onMouseLeave={setCardHovered}
        onFocus={setCardHovered}
        onBlur={setCardHovered}
      >
        <BackgroundImage backgroundURL={imageUrl} />
        <CardIconsWrapper>
          <MarketStateBadge market={market} isCardHovered={isCardHovered} />
        </CardIconsWrapper>
        <CardContent>
          <object>
            <WrappedLinkToFilterMarkets
              relatedMarkets={isRelatedMarkets}
              param={{ type: 'category', value: category }}
            />
          </object>
          <CardTitle relatedMarkets={isRelatedMarkets}>{cutMarketsCardTitle(title)}</CardTitle>
          <Divider />
          <Footer>
            <FooterLeft>
              <YesLine>
                <ThumbDown relatedMarkets={isRelatedMarkets} />
                <YesNoText relatedMarkets={isRelatedMarkets}>
                  YES{limitOrder.yesLimitOrderPrice > 0 ? ` – ${limitOrder.yesLimitOrderPrice}x` : ''}
                </YesNoText>
              </YesLine>
              <NoLine>
                <ThumbUp relatedMarkets={isRelatedMarkets} />
                <YesNoText relatedMarkets={isRelatedMarkets}>
                  NO{limitOrder.noLimitOrderPrice > 0 ? ` – ${limitOrder.noLimitOrderPrice}x` : ''}
                </YesNoText>
              </NoLine>
            </FooterLeft>
            <Volume relatedMarkets={isRelatedMarkets}>
              <VolumeText>Volume</VolumeText>
              {volume.abbreviatedEos} EOS
            </Volume>
          </Footer>
        </CardContent>
        {id}
      </Card>
    </CardLink>
  );
};
