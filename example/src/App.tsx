import React, { Component } from 'react';
import styled from 'styled-components';

import { CardWrapper } from './reactComponentLib';

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
        <CardWrapper id="12" />
      </div>
    );
  }
}

export default App;
