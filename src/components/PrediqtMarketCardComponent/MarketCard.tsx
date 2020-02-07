import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

import { getMarket } from '../../service';
import { cutMarketsCardTitle } from '../../utils';

import { MarketCardProps, Market, RelatedMarketProp, BackgroundImageProps, CardTitleProps } from '../../interfaces';

import { ThumbDownIcon, ThumbUpIcon } from '../icons';
import { MarketStateBadge } from './MarketStateBadge';
import { LinkToFilterMarkets } from './LinkToFilterMarkets';
import { LastTradeBar } from './LastTradeBar';

import { CONTENT_MAX_WIDTH, PREDIQT_SITE_URL } from '../../constants';

const CardLink = styled.a`
  display: block;
  width: 320px;
  text-decoration: none;

  @media (max-width: ${CONTENT_MAX_WIDTH}px) {
    width: 240px;
  }
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

const Card = styled.article<RelatedMarketProp>`
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
  ${({ isRelatedMarket }) =>
    isRelatedMarket
      ? 'height: 338px;'
      : `
       height: 509px;
       
       @media (max-width: ${CONTENT_MAX_WIDTH}px) {
         height: 338px;
       }`};
`;

const CardTitle = styled.h4<CardTitleProps>`
  margin: 18px 0 11px;
  line-height: 24px;

  @media (max-width: ${CONTENT_MAX_WIDTH}px) {
    max-height: 80px;
    font-size: 14px;
    overflow: hidden;

    margin: ${({ isLastTradeBar }) => (isLastTradeBar ? '10px 0 5px' : '10px 0')};
  }

  ${({ isLastTradeBar, isRelatedMarket, theme }) =>
    isRelatedMarket
      ? `
      margin: ${isLastTradeBar ? '10px 0 5px' : '10px 0'};
      font: 14px ${theme.fonts.workSans};
    `
      : `
      ${isLastTradeBar ? '' : 'margin: 18px 0;'}
      font: 18px ${theme.fonts.workSans};
  `};

  font-weight: 500;
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

const YesNoText = styled.p<RelatedMarketProp>`
  margin-left: 5px;

  font-size: ${({ isRelatedMarket }) => `${isRelatedMarket ? 12 : 14}px`};
  font-weight: 600;
  letter-spacing: 0.24px;

  @media (max-width: ${CONTENT_MAX_WIDTH}px) {
    font-size: 12px;
  }
`;

const Volume = styled.p<RelatedMarketProp>`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  font: ${({ isRelatedMarket, theme }) => `${isRelatedMarket ? 12 : 14}px ${theme.fonts.workSans}`};
  font-weight: 500;
  letter-spacing: 0.24px;
  line-height: 14px;

  @media (max-width: ${CONTENT_MAX_WIDTH}px) {
    font-size: 12px;
  }
`;

const ThumbIconStyles = css<RelatedMarketProp>`
  ${({ isRelatedMarket }) =>
    isRelatedMarket
      ? `
      width: 12px;
      height: 12px;
      `
      : `
      width: 14px;
      height: 14px;

      @media (max-width: ${CONTENT_MAX_WIDTH}px) {
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
  margin-bottom: auto;
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

const WrappedLastTradeBar = styled(LastTradeBar)<RelatedMarketProp>`
  ${({ isRelatedMarket }) => `
    padding: ${isRelatedMarket ? 5 : 7}px 0;
    margin-bottom: ${isRelatedMarket ? 5 : 11}px;
  `};

  @media (max-width: ${CONTENT_MAX_WIDTH}px) {
    margin-bottom: 5px;
    padding: 5px 0;
  }
`;

const isRelatedMarket = false;

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

  const { volume, limitOrder, ipfs, lastTrade } = market;
  const { imageUrl, title, category } = ipfs;

  const isLastTradeBar = Boolean(lastTrade);

  return (
    <CardLink className="prediqt-market-card-root-link" href={`${PREDIQT_SITE_URL}market/${id}`} target="_blank">
      <Card
        isRelatedMarket={isRelatedMarket}
        onMouseEnter={setCardHovered}
        onMouseLeave={setCardHovered}
        onFocus={setCardHovered}
        onBlur={setCardHovered}
      >
        <BackgroundImage backgroundURL={imageUrl} />
        <BackgroundShadow />
        <CardIconsWrapper>
          <MarketStateBadge market={market} isCardHovered={isCardHovered} />
        </CardIconsWrapper>
        <CardContent>
          <object>
            <LinkToFilterMarkets isRelatedMarket={isRelatedMarket} param={{ type: 'category', value: category }} />
          </object>
          <CardTitle isLastTradeBar={isLastTradeBar} isRelatedMarket={isRelatedMarket}>
            {cutMarketsCardTitle(title)}
          </CardTitle>
          {isLastTradeBar && <WrappedLastTradeBar isRelatedMarket={isRelatedMarket} params={lastTrade} />}
          <Divider />
          <Footer>
            <FooterLeft>
              <YesLine>
                <ThumbDown isRelatedMarket={isRelatedMarket} />
                <YesNoText isRelatedMarket={isRelatedMarket}>
                  YES{limitOrder.yesLimitOrderPrice > 0 ? ` – ${limitOrder.yesLimitOrderPrice}x` : ''}
                </YesNoText>
              </YesLine>
              <NoLine>
                <ThumbUp isRelatedMarket={isRelatedMarket} />
                <YesNoText isRelatedMarket={isRelatedMarket}>
                  NO{limitOrder.noLimitOrderPrice > 0 ? ` – ${limitOrder.noLimitOrderPrice}x` : ''}
                </YesNoText>
              </NoLine>
            </FooterLeft>
            <Volume isRelatedMarket={isRelatedMarket}>
              <VolumeText>Volume</VolumeText>
              <span>{volume.abbreviatedEos} EOS</span>
            </Volume>
          </Footer>
        </CardContent>
      </Card>
    </CardLink>
  );
};
