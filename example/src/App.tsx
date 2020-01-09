import React, { Component } from 'react';
import styled from 'styled-components';

import { PrediqtMarketsComponent, PrediqtMarketCardComponent } from './reactComponentLib';

const StyledDiv = styled.div`
  padding: 10px;
  background-color: #333333;
  color: white;
`;

class App extends Component {
  render() {
    return (
      <div>
        <StyledDiv>Example of PredIQt components</StyledDiv>
        <PrediqtMarketsComponent text="Market lists" />
        <PrediqtMarketCardComponent id="4" />
      </div>
    );
  }
}

export default App;
