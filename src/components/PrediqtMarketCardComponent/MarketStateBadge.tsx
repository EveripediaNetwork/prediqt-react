import React from 'react';
import format from 'date-fns/format';
import styled from 'styled-components';

import { checkMarketMatured, checkMarketInvalid } from '../../utils';

import { MarketStateBadgeProps, BadgeProps } from '../../interfaces';

import { Icon } from '../icons/Icon';

import { CONTENT_MAX_WIDTH } from '../../constants';

const Title = styled.p`
  display: none;
  margin-right: 5px;
  font: 14px ${({ theme }) => theme.fonts.workSans};
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
    border-radius: 16px;
    padding: 0 8px;
    
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
  border-radius: 15px;
  padding: 0 8px;

  & ${Title} {
    display: block;
  }

  @media (max-width: ${CONTENT_MAX_WIDTH}px) {
    width: auto;
  }
`;

const BadgeIcon = styled(Icon)`
  width: 16px;
  height: 16px;
  color: #ffffff;

  @media (max-width: ${CONTENT_MAX_WIDTH}px) {
    width: 14px;
    height: 14px;
  }
`;

export const MarketStateBadge: React.FC<MarketStateBadgeProps> = function({ market, isCardHovered }) {
  let Wrapper = Badge;
  let title;
  let badgeIconName;
  switch (true) {
    case market.isResolved:
      title = 'resolved';
      badgeIconName = 'circled-tick';
      break;

    case checkMarketInvalid(market):
      title = 'invalid';
      badgeIconName = 'invalid';
      break;

    case checkMarketMatured(market):
      title = 'matured';
      badgeIconName = 'watch-alert';
      break;

    default:
      Wrapper = OpenedBadge;
      title = format(market.endOfMarketTime * 1000, 'd MMM yyyy');
      badgeIconName = 'watch';
      break;
  }
  console.log(badgeIconName);
  return (
    <Wrapper isHovered={isCardHovered}>
      <Title>{title}</Title>
      <BadgeIcon />
    </Wrapper>
  );
};
