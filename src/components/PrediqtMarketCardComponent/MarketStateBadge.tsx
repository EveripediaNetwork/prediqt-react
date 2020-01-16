import React from 'react';
import format from 'date-fns/format';
import styled, { css } from 'styled-components';

import { checkMarketMatured, checkMarketInvalid } from '../../utils';

import { MarketStateBadgeProps, BadgeProps } from '../../interfaces';

import { CircledTickIcon, InvalidIcon, WatchAlertIcon, WatchIcon } from '../icons';

import { CONTENT_MAX_WIDTH } from '../../constants';

const Title = styled.p`
  display: none;
  margin-right: 5px;
  font: 14px ${({ theme }) => theme.fonts.workSans};
  font-weight: 500;
  text-transform: uppercase;

  @media (max-width: ${CONTENT_MAX_WIDTH}px) {
    font-size: 12px;
  }
`;

const Badge = styled.div<BadgeProps>`
  position: absolute;
  top: 0;
  right: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.4);

  @media (max-width: ${CONTENT_MAX_WIDTH}px) {
    width: 30px;
    height: 30px;
  }

  ${({ isHovered }) =>
    isHovered &&
    `
    width: auto;
    padding: 0 8px;
    border-radius: 16px;
    
    & ${Title} {
      display: block;
    };
    
    @media (max-width: ${CONTENT_MAX_WIDTH}px) {
      width: auto;
    }
  `};
`;

const OpenedBadge = styled(Badge)`
  width: auto;
  padding: 0 8px;
  border-radius: 15px;

  & ${Title} {
    display: block;
  }

  @media (max-width: ${CONTENT_MAX_WIDTH}px) {
    width: auto;
  }
`;

const iconStyles = css`
  width: 16px;
  height: 16px;
  color: #ffffff;

  @media (max-width: ${CONTENT_MAX_WIDTH}px) {
    width: 14px;
    height: 14px;
  }
`;

const CircledTick = styled(CircledTickIcon)`
  ${iconStyles}
`;

const Invalid = styled(InvalidIcon)`
  ${iconStyles}
`;

const WatchAlert = styled(WatchAlertIcon)`
  ${iconStyles}
`;

const Watch = styled(WatchIcon)`
  ${iconStyles}
`;

export const MarketStateBadge: React.FC<MarketStateBadgeProps> = function({ market, isCardHovered }) {
  let Wrapper = Badge;
  let title;
  let BadgeIcon;
  switch (true) {
    case market.isResolved:
      title = 'resolved';
      BadgeIcon = CircledTick;
      break;

    case checkMarketInvalid(market):
      title = 'invalid';
      BadgeIcon = Invalid;
      break;

    case checkMarketMatured(market):
      title = 'matured';
      BadgeIcon = WatchAlert;
      break;

    default:
      Wrapper = OpenedBadge;
      title = format(market.endOfMarketTime * 1000, 'd MMM yyyy');
      BadgeIcon = Watch;
      break;
  }

  return (
    <Wrapper isHovered={isCardHovered}>
      <Title>{title}</Title>
      <BadgeIcon />
    </Wrapper>
  );
};
