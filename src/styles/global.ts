import { createGlobalStyle } from 'styled-components';
import normalize from 'styled-normalize';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700|Work+Sans:400,500,600&display=swap');
  
  ${normalize}

  *, *::after, *::before {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    line-height: normal;
  }
  
  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    font-weight: 400;
  }
  
  html {
    height: 100%;
  }
  
  #root {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  
  body {
    height: 100%;
  	overflow-x: hidden;
    overflow-anchor: none;
    
    ${({ theme }) => `
      font-family: ${theme.fonts.openSans}; 
      background-color: ${theme.colors.contextLightGrey};
  	  color: ${theme.colors.contextDarkBlue};
    `};
  }
  
  button {
  	border: 0;
    background-color: transparent;
    cursor: pointer;
    appearance: none;
    line-height: normal;
  }
  
  div, p, section, article {
    outline: none;
  }
  
  input {
    border: none;
  }
  
  button:focus,
  a:focus,
  input:focus,
  label:focus {
  	outline: 4px solid rgba(53, 218, 192, 0.2);
  	outline-offset: 0;
  }
  
  input[type="search"]::-webkit-search-decoration,
  input[type="search"]::-webkit-search-cancel-button,
  input[type="search"]::-webkit-search-results-button,
  input[type="search"]::-webkit-search-results-decoration {
    appearance: none;
  }
  
  a,
  a:hover,
  a:active,
  a:focus {
    text-decoration: none;
  }
  
  ul {
    list-style-type: none;
  }
  
  label {
  	margin: 0;
  }
  
  hr {
    border: 0;
  }
`;
