import { Theme } from 'theme-ui';
const makeTheme = <T extends Theme>(t: T) => t;

const theme = makeTheme({
  space: [], // TBD later
  breakpoints: [], // TBD later
  colors: {
    transparent: 'transparent',
    black: '#0E0E0E',
    white: '#FFFFFF',
    alphaWhite: 'rgba(255, 255, 255, 0.7)',
    hoverWhite: 'rgba(255, 255, 255, 0.4)',
    hoverBlack: 'rgba(0, 0, 0, 0.4)',
    grey: {
      '1': '#EBEBEB',
      '2': '#C2C2C2',
      '3': '#5C5C5C',
    },
    green: '#48BB78',
    lightGreen: '#DDFFE8',
    red: '#E53E3E',
    lightRed: '#FFECEC',
    yellow: '#FFDA00',
    darkYellow: '#D69E2E',
    lightYellow: '#FFFED9',
    blue: '#4775EA',
    lightBlue: '#DEE8FF',
  },
  fonts: {
    body: '"DM Sans", sans-serif',
    heading: '"DM Sans", sans-serif',
  },
  fontWeights: {
    regular: 400,
    medium: 500,
    bold: 700,
    body: 400,
    heading: 700,
  },
  fontSizes: [12, 16, 20, 32, 40, 48, 60, 64],
  text: {
    default: {
      color: 'black',
      fontFamily: 'body',
      fontSize: 16,
      fontWeight: 'body',
    },
    caps: {
      fontSize: 12,
      textTransform: 'uppercase',
    },
    heading: {
      fontFamily: 'heading',
      fontWeight: 'heading',
    },
  },
  buttons: {
    primary: {
      '&:hover': {
        color: 'hoverWhite',
        backgroundColor: 'hoverBlack',
      },
    },
  },
  styles: {
    h1: { fontSize: 60 },
    h2: { fontSize: 48 },
    h3: { fontSize: 40 },
    h4: { fontSize: 32 },
    h5: { fontSize: 20 },
    a: { fontFamily: 'body' },
  },
});

export type ExactTheme = typeof theme;

export default theme;
