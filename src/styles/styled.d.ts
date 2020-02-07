import 'styled-components';

declare module 'styled-components' {
  interface DefaultTheme {
    colors: {
      lightGrey: string;
      contextLightGrey: string;
      contextBorderGrey: string;
      contextDarkBlue: string;
      contextMint: string;
      contextDarkGrey: string;
      yesGreen: string;
      noRed: string;
    };
    fonts: {
      openSans: string;
      workSans: string;
    };
  }
}
