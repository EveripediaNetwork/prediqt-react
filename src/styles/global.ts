import { createGlobalStyle } from 'styled-components';
import normalize from 'styled-normalize';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700|Work+Sans:400,500,600&display=swap');
  
  ${normalize}

  .prediqt-market-card-root-link {
    font-family: ${({ theme }) => theme.fonts.openSans};
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    line-height: normal;
    outline: none;
  }
    
  .prediqt-market-card-root-link * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    line-height: normal;
    outline: none;
  }
`;
