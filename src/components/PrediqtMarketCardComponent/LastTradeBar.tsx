import React, { useState } from 'react';
import styled from 'styled-components';

import { LastTradeBarLineProp, LastTradeBarProps } from '../../interfaces';

import {LastTradeBarLineColors} from "../../enums";

import { CONTENT_MAX_WIDTH } from '../../constants';

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

const LinesWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 6px;
  border-radius: 3px;
  overflow: hidden;
`;

const Line = styled.div<LastTradeBarLineProp>`
  position: absolute;
  width: 100%;
  height: 100%;
  transition: 0.2s transform;

  ${({ color, transform, theme }) => `
    background-color: ${theme.colors[color]};
    transform: translateX(${transform}%);
  `}
`;

const Tooltip = styled.div`
  position: absolute;
  left: 50%;
  top: 100%;
  z-index: 1;
  transform: translateX(-50%);
  padding: 7px;
  border-radius: 6px;
  background-color: #ffffff;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.55);

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    bottom: 100%;
    transform: translateX(-50%);
    border: 5px solid transparent;
    border-bottom: 5px solid #ffffff;
  }

  @media (max-width: ${CONTENT_MAX_WIDTH}px) {
    padding: 5px;

    &::before {
      border: 3px solid transparent;
      border-bottom: 3px solid #ffffff;
    }
  }
`;

const TooltipText = styled.p`
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
  color: ${({ theme }) => theme.colors.contextDarkGrey};

  @media (max-width: ${CONTENT_MAX_WIDTH}px) {
    font-size: 10px;
  }
`;

const YesText = styled.span`
  color: ${({ theme }) => theme.colors.yesGreen};
`;

const NoText = styled(YesText)`
  color: ${({ theme }) => theme.colors.noRed};
`;

const YES_TEXT = 'YES';
const NO_TEXT = 'NO';

export const LastTradeBar: React.FC<LastTradeBarProps> = function({ params, className }) {
  const [isTooltipOpen, toggleTooltip] = useState(false);

  function onMouseTooltip() {
    toggleTooltip(prevState => !prevState);
  }

  const { price, symbol } = params;

  let yesTranslate = 0;
  let noTranslate = 0;
  if (symbol === YES_TEXT) {
    noTranslate = price * 100;
    yesTranslate = 100 - noTranslate;
  }
  if (symbol === NO_TEXT) {
    yesTranslate = price * 100;
    noTranslate = 100 - yesTranslate;
  }

  if (!yesTranslate && !noTranslate) {
    return null;
  }

  return (
    <Wrapper
      aria-label={`${YES_TEXT} - ${noTranslate}%, ${NO_TEXT} - ${yesTranslate}%`}
      onMouseEnter={onMouseTooltip}
      onMouseLeave={onMouseTooltip}
      onTouchStart={onMouseTooltip}
      onTouchEnd={onMouseTooltip}
      className={className}
    >
      {isTooltipOpen && (
        <Tooltip>
          <TooltipText>
            <YesText>
              {YES_TEXT} - {noTranslate}%
            </YesText>
            &nbsp;
            <NoText>
              {NO_TEXT} - {yesTranslate}%
            </NoText>
          </TooltipText>
        </Tooltip>
      )}
      <LinesWrapper>
        <Line color={LastTradeBarLineColors.Green} transform={-yesTranslate} />
        <Line color={LastTradeBarLineColors.Red} transform={noTranslate} />
      </LinesWrapper>
    </Wrapper>
  );
};
