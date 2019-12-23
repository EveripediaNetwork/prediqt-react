import React from 'react';
import styled from 'styled-components';

const BackgroundShadow = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-image: linear-gradient(to top, rgba(0, 0, 0, 0.7) 35%, 55%, transparent);
`;

const BackgroundImage = styled(BackgroundShadow)`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-image: none;
  backface-visibility: hidden;
  transition: transform 0.4s;
`;

const Card = styled.section`
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
        ? "height: 338px;"
        : `
       height: 509px;
       
       @media (max-width: 1124px) {
         height: 338px;
       }`};
`;

const CardTitle = styled.h4`
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

const CardLink = styled(Link)`
  display: block;
`;

const WrappedLinkToFilterMarkets = styled(LinkToFilterMarkets)`
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

const Category = styled(WrappedLinkToFilterMarkets).attrs({ as: "p" })`
  width: fit-content;
  text-transform: uppercase;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.25);
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

const YesNoText = styled.p`
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

const Volume = styled.p`
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

const ThumbIcon = styled(Icon)`
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

export interface PrediqtMarketCardProps {
  id: string;
}

const isRelatedMarkets = false;

export const PrediqtMarketCardComponent: React.FC<PrediqtMarketCardProps> = ({ id }) => (
  <Card>
    <BackgroundImage backgroundURL={image_url} />
    <BackgroundShadow />
    {!isWithoutLink && !isRelatedMarkets && (
        <CardIconsWrapper>
          <MarketStateBadge market={market} isCardHovered={isCardHovered} />
          <VerifiedMark isVerified={market.isVerified} marketId={id} />
          <HideMarketMark isHidden={market.isHidden} marketId={id} />
        </CardIconsWrapper>
    )}
    <CardContent>
      {isFilterURLParam ? (
          <Category>{category}</Category>
      ) : (
          <object>
            <WrappedLinkToFilterMarkets param={{ type: "category", value: category }} />
          </object>
      )}
      <CardTitle relatedMarkets={isRelatedMarkets}>{cutMarketsCardTitle(title)}</CardTitle>
      <Divider />
      <Footer>
        <FooterLeft>
          <YesLine>
            <ThumbIcon name="thumb-up" relatedMarkets={isRelatedMarkets} />
            <YesNoText relatedMarkets={isRelatedMarkets}>
              YES{limitOrder?.yesLimitOrderPrice > 0 ? ` – ${limitOrder?.yesLimitOrderPrice}x` : ""}
            </YesNoText>
          </YesLine>
          <NoLine>
            <ThumbIcon name="thumb-down" relatedMarkets={isRelatedMarkets} />
            <YesNoText relatedMarkets={isRelatedMarkets}>
              NO{limitOrder?.noLimitOrderPrice > 0 ? ` – ${limitOrder?.noLimitOrderPrice}x` : ""}
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
);
