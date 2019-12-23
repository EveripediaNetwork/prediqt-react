import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 10px;
  color: black;
`;

export interface PrediqtMarketCardProps {
  id: string;
}

export const PrediqtMarketCardComponent: React.FC<PrediqtMarketCardProps> = ({ id }) => (
  <Wrapper>{id}</Wrapper>
);
