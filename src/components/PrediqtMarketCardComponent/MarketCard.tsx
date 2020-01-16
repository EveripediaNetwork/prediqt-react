import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

import { getMarket } from '../../service';
import { cutMarketsCardTitle } from '../../utils';

import { MarketCardProps, Market, RelatedMarketsProp, BackgroundImageProps } from '../../interfaces';

import { ThumbDownIcon, ThumbUpIcon } from '../icons';
import { MarketStateBadge } from './MarketStateBadge';
import { LinkToFilterMarkets } from './LinkToFilterMarkets';

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
  ${({ isRelatedMarkets }) =>
    isRelatedMarkets
      ? 'height: 338px;'
      : `
       height: 509px;
       
       @media (max-width: ${CONTENT_MAX_WIDTH}px) {
         height: 338px;
       }`};
`;

const CardTitle = styled.h4<RelatedMarketsProp>`
  margin: 18px 0;
  line-height: 24px;

  font: ${({ isRelatedMarkets, theme }) => `${isRelatedMarkets ? 14 : 18}px ${theme.fonts.workSans}`};
  font-weight: 500;

  @media (max-width: ${CONTENT_MAX_WIDTH}px) {
    max-height: 80px;
    overflow: hidden;
    font-size: 14px;
  }
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

  font-size: ${({ isRelatedMarkets }) => `${isRelatedMarkets ? 12 : 14}px`};
  font-weight: 600;
  letter-spacing: 0.24px;

  @media (max-width: ${CONTENT_MAX_WIDTH}px) {
    font-size: 12px;
  }
`;

const Volume = styled.p<RelatedMarketsProp>`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  font: ${({ isRelatedMarkets, theme }) => `${isRelatedMarkets ? 12 : 14}px ${theme.fonts.workSans}`};
  font-weight: 500;
  letter-spacing: 0.24px;
  line-height: 14px;

  @media (max-width: ${CONTENT_MAX_WIDTH}px) {
    font-size: 12px;
  }
`;

const ThumbIconStyles = css<RelatedMarketsProp>`
  ${({ isRelatedMarkets }) =>
    isRelatedMarkets
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
    <CardLink className="prediqt-market-card-root-link" href={`${PREDIQT_SITE_URL}market/${id}`} target="_blank">
      <Card
        isRelatedMarkets={isRelatedMarkets}
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
            <LinkToFilterMarkets isRelatedMarkets={isRelatedMarkets} param={{ type: 'category', value: category }} />
          </object>
          <CardTitle isRelatedMarkets={isRelatedMarkets}>{cutMarketsCardTitle(title)}</CardTitle>
          <Divider />
          <Footer>
            <FooterLeft>
              <YesLine>
                <ThumbDown isRelatedMarkets={isRelatedMarkets} />
                <YesNoText isRelatedMarkets={isRelatedMarkets}>
                  YES{limitOrder.yesLimitOrderPrice > 0 ? ` – ${limitOrder.yesLimitOrderPrice}x` : ''}
                </YesNoText>
              </YesLine>
              <NoLine>
                <ThumbUp isRelatedMarkets={isRelatedMarkets} />
                <YesNoText isRelatedMarkets={isRelatedMarkets}>
                  NO{limitOrder.noLimitOrderPrice > 0 ? ` – ${limitOrder.noLimitOrderPrice}x` : ''}
                </YesNoText>
              </NoLine>
            </FooterLeft>
            <Volume isRelatedMarkets={isRelatedMarkets}>
              <VolumeText>Volume</VolumeText>
              <span>{volume.abbreviatedEos} EOS</span>
            </Volume>
          </Footer>
        </CardContent>
      </Card>
    </CardLink>
  );
};
