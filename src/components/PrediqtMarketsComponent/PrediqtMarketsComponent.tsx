import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 10px;
  color: black;
`;

export interface PrediqtMarketsProps {
  text?: string;
}

export const PrediqtMarketsComponent: React.FC<PrediqtMarketsProps> = ({ text }) => (
  <Wrapper>{text ? text : 'Markets examples'}</Wrapper>
);
