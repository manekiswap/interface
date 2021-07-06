import { Theme } from 'theme-ui';

const theme = (function () {
  const customTheme = {
    config: {
      initialColorModeName: 'dark',
      printColorModeName: 'light',
      useBorderBox: true,
      useColorSchemeMediaQuery: false,
    },
    breakpoints: ['32em', '48em', '64em', '96em', '128em'],
    space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
    sizes: [0, 4, 8, 16, 32, 64, 128, 256, 512],
    fonts: {
      body: '"DM Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
      heading:
        '"DM Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
      monospace:
        '"DM Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    },
    fontSizes: [12, 16, 20, 28, 32, 40, 48, 60],
    fontWeights: {
      body: 400,
      heading: 700,
      regular: 400,
      medium: 500,
      bold: 700,
    },
    lineHeights: {
      body: 1.5,
      heading: 1.2,
    },
    text: {
      default: { fontFamily: 'body', fontWeight: 'body', fontSize: 1, lineHeight: 'body' },
      caps: { fontFamily: 'body', fontWeight: 'body', fontSize: 0, lineHeight: 'body', textTransform: 'uppercase' },
      heading: { fontFamily: 'heading', fontWeight: 'heading', lineHeight: 'heading' },
    },
    links: {
      focus: { textDecoration: 'none', color: 'secondary', border: '1px solid', borderColor: 'secondary', p: 1 },
      visited: { textDecoration: 'underline', color: 'muted' },
      hover: { textDecoration: 'underline', color: 'primary', cursor: 'pointer' },
    },
    colors: {
      text: '#FFFFFF',
      background: '#0E0E0E',
      primary: '#FFDA00',
      secondary: '#5C5C5C',
      accent: 'rgba(27, 27, 27, 0.7)',
      muted: '#1B1B1B',
      border: 'rgba(255, 255, 255, 0.2)',
      label: '#C9C9C9',
      error: '#FD8383',
      divider: 'rgba(255, 255, 255, 0.2)',
      underlay: '#EBEBEB',
      placeholder: 'rgba(255, 255, 255, 0.4)',
      modalBackground: '#1B1B1B',

      modes: {
        light: {
          text: '#0E0E0E',
          background: '#FFFFFF',
          primary: '#FFDA00',
          secondary: '#5C5C5C',
          accent: 'rgba(27, 27, 27, 0.7)',
          muted: '#1B1B1B',
          border: 'rgba(0, 0, 0, 0.2)',
          label: '#C9C9C9',
          error: '#FD8383',
          divider: '#9F9F9F',
          underlay: '#EBEBEB',
          placeholder: 'rgba(0, 0, 0, 0.4)',
          modalBackground: '#FFFFFF',
        },
      },
      blue: {
        '100': '#F2F7FF',
        '200': '#CCDFFF',
        '300': '#84B3FF',
        '400': '#415BE5',
        '500': '#2A43C6',
        '600': '#2D33CB',
      },
      red: {
        '100': '#FFF0F3',
        '200': '#FD8383',
        '300': '#E72C43',
        '400': '#B30038',
      },
      orange: {
        '100': '#FFEDDD',
        '200': '#F7A75E',
        '300': '#F18C2F',
        '400': '#D9761B',
      },
      yellow: {
        '100': '#FFFCE0',
        '200': '#FFF9C2',
        '300': '#FFDA00',
        '400': '#F4D100',
        '500': '#ECCA02',
        '600': '#DAB701',
      },
      green: {
        '100': '#E7FFFC',
        '200': '#66ECCC',
        '300': '#00B388',
        '400': '#005B52',
      },
      dark: {
        transparent: 'rgba(92, 92, 92, 0.3)',
        '100': '#C9C9C9',
        '200': '#9F9F9F',
        '300': '#5C5C5C',
        '400': '#1B1B1B',
        '500': '#0E0E0E',
      },
      white: {
        '100': 'rgba(255, 255, 255, 0.2)',
        '200': 'rgba(255, 255, 255, 0.4)',
        '300': 'rgba(255, 255, 255, 0.7)',
        '400': '#FFFFFF',
      },
    },
    radii: {
      none: 0,
      sm: 2,
      base: 4,
      md: 6,
      lg: 8,
      xl: 12,
      '2xl': 16,
      '3xl': 24,
      circle: 9999,
    },
    shadows: {
      xs: '0 0 0 1px rgba(0, 0, 0, 0.05)',
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      base: '0 1px 3px 0 rgba(0, 0, 0, 0.1),0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1),0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1),0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1),0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      outline: '0 0 0 3px rgba(255, 255, 255, 0.4)',
      inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      none: 'none',
      card: '8px 8px 0 0 #262626',
      'dark-lg': 'rgba(0, 0, 0, 0.1) 0px 0px 0px 1px,rgba(0, 0, 0, 0.2) 0px 5px 10px,rgba(0, 0, 0, 0.4) 0px 15px 40px',
    },
    badges: {
      primary: { backgroundColor: 'gray1', borderRadius: '38px', color: 'text', py: 1, px: 3 },
      success: { backgroundColor: 'success', borderRadius: '38px', color: 'background', py: 1, px: 3 },
      lightest: { backgroundColor: 'gray2', borderRadius: '38px', color: 'gray0', py: 1, px: 3 },
      warning: { backgroundColor: 'primary', borderRadius: '38px', color: 'background', py: 1, px: 3 },
      darker: { backgroundColor: 'secondary', borderRadius: '38px', color: 'background', py: 1, px: 3 },
      error: { backgroundColor: 'error', borderRadius: '38px', color: 'background', py: 1, px: 3 },
    },
    buttons: {
      primary: {
        variant: 'styles.button',
        backgroundColor: 'yellow.300',
        color: 'dark.500',
        '&:hover': { backgroundColor: 'yellow.400' },
        '&:focus': { boxShadow: 'outline' },
        '&:active': { backgroundColor: 'yellow.500' },
        '&:disabled,&[disabled]': {
          cursor: 'not-allowed',
          backgroundColor: 'dark.transparent',
          color: 'dark.300',
        },
      },
      secondary: {
        variant: 'styles.button',
        border: '1px solid',
        backgroundColor: 'transparent',
        borderColor: 'white.300',
        color: 'white.400',
        '&:hover': { backgroundColor: 'dark.400' },
        '&:focus': { boxShadow: 'outline' },
        '&:active': { backgroundColor: 'dark.300' },
        '&:disabled,&[disabled]': {
          cursor: 'not-allowed',
          backgroundColor: 'transparent',
          borderColor: 'white.100',
          color: 'white.200',
        },
      },
      ghost: {
        variant: 'styles.button',
        backgroundColor: 'transparent',
        color: 'yellow.300',
        '&:hover': { backgroundColor: 'white.100' },
        '&:focus': { boxShadow: 'outline' },
        '&:active': { backgroundColor: 'white.200' },
        '&:disabled,&[disabled]': {
          cursor: 'not-allowed',
          backgroundColor: 'transparent',
          color: 'white.200',
        },
      },
      link: {
        variant: 'styles.button',
        px: 0,
        height: 'initial',
        backgroundColor: 'transparent',
        color: 'blue.300',
        '&:hover': { backgroundColor: 'white.100' },
        '&:focus': { boxShadow: 'outline' },
        '&:active': { backgroundColor: 'white.200' },
        '&:disabled,&[disabled]': {
          cursor: 'not-allowed',
          backgroundColor: 'transparent',
          color: 'white.200',
        },
      },
      icon: {
        px: 0,
        py: 0,
        height: 56,
        width: 56,
        backgroundColor: 'transparent',
        color: 'blue.300',
        transition: 'all 0.2s ease',
        outline: 'none',
        cursor: 'pointer',
        '&>svg': {
          height: 32,
          width: 32,
          path: {
            color: 'currentcolor',
          },
        },
        '&:hover': { backgroundColor: 'white.100' },
        '&:focus': { boxShadow: 'outline' },
        '&:active': { backgroundColor: 'white.200' },
        '&:disabled,&[disabled]': {
          cursor: 'not-allowed',
          backgroundColor: 'transparent',
          color: 'white.200',
        },
      },
      'small-primary': {
        variant: 'buttons.primary',
        px: 16,
        height: 48,
        fontSize: 1,
      },
      'small-secondary': {
        variant: 'buttons.secondary',
        px: 16,
        height: 48,
        fontSize: 1,
      },
      'small-ghost': {
        variant: 'buttons.ghost',
        px: 16,
        height: 48,
        fontSize: 1,
      },
      'small-link': {
        variant: 'buttons.link',
        px: 0,
        fontSize: 1,
        '&>svg': {
          height: 16,
          width: 16,
        },
      },
    },
    forms: {
      //   checkbox: { 'input:checked ~ &': { color: 'secondary' }, 'input:disabled ~ &': { color: 'gray1', bg: 'gray2' } },
      //   radio: { 'input:checked ~ &': { color: 'secondary' }, 'input:disabled ~ &': { color: 'gray1', bg: 'gray2' } },
      //   select: {
      //     fontFamily: 'body',
      //     borderRadius: '23px',
      //     border: '1px solid',
      //     borderColor: 'gray1',
      //     px: 3,
      //     py: '0.812rem',
      //     '&:focus,&:not(:placeholder-shown)': { outline: 'none', borderColor: 'gray0' },
      //     '::placeholder,:-ms-input-placeholder,::-ms-input-placeholder': { color: 'gray0' },
      //     '&:disabled,&[disabled]': { bg: 'highlight', color: 'muted' },
      //     '& + svg': { ml: '-3.125rem' },
      //   },
      input: {},
      //   textarea: {
      //     fontFamily: 'body',
      //     borderRadius: '23px',
      //     border: '1px solid',
      //     borderColor: 'gray1',
      //     px: 3,
      //     py: '0.812rem',
      //     '&:focus,&:not(:placeholder-shown)': { outline: 'none', borderColor: 'gray0' },
      //     '::placeholder,:-ms-input-placeholder,::-ms-input-placeholder': { color: 'gray0' },
      //     '&:disabled,&[disabled]': { bg: 'highlight', color: 'muted' },
      //   },
      //   error: {
      //     fontFamily: 'body',
      //     borderRadius: '23px',
      //     border: '1px solid',
      //     borderColor: 'error',
      //     px: 3,
      //     py: '0.812rem',
      //     '&:focus,&:not(:placeholder-shown)': { outline: 'none', borderColor: 'error' },
      //     '::placeholder,:-ms-input-placeholder,::-ms-input-placeholder': { color: 'gray0' },
      //     '&:disabled,&[disabled]': { bg: 'highlight', color: 'muted' },
      //   },
    },
    styles: {
      root: {
        height: '100%',
        '#root': {
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          maxWidth: '100%',
          width: '100vw',
          backgroundColor: '#FFFFFF',
        },
      },
      button: {
        display: 'flex',
        py: 0,
        px: 24,
        height: 60,
        minWidth: 48,
        fontFamily: 'body',
        fontWeight: 'bold',
        fontSize: 2,
        whiteSpace: 'nowrap',
        borderRadius: 'base',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s ease',
        outline: 'none',
        cursor: 'pointer',
        '&>svg': {
          display: 'flex',
          height: 24,
          width: 24,
          verticalAlign: 'bottom',
          path: {
            color: 'currentcolor',
          },
        },
      },
      hr: { backgroundColor: 'divider', margin: 0 },
      h1: { variant: 'text.heading', fontSize: '3.75rem' },
      h2: { variant: 'text.heading', fontSize: '3rem' },
      h3: { variant: 'text.heading', fontSize: '2.5rem' },
      h4: { variant: 'text.heading', fontSize: '2rem' },
      h5: { variant: 'text.heading', fontSize: '1.75rem' },
      h6: { variant: 'text.heading', fontSize: '1.25rem' },
      pre: { fontFamily: 'monospace', overflowX: 'auto', code: { color: 'inherit' } },
      code: { fontFamily: 'monospace', fontSize: 'inherit' },
      table: { width: '100%', borderCollapse: 'separate', borderSpacing: 0 },
      th: { textAlign: 'left', borderBottomStyle: 'solid' },
      td: { textAlign: 'left', borderBottomStyle: 'solid' },
      a: {
        color: 'accent',
        textDecoration: 'underline',
        '&:hover': { variant: 'links.hover' },
        '&:focus': { variant: 'links.focus' },
        '&:visited': { variant: 'links.visited' },
      },
      'form-input': {
        display: 'flex',
        flexDirection: 'column',
        px: 0,
        py: '4px',
        height: 60,
        border: '1px solid',
        borderRadius: 'base',
        outline: 'none',
        pointerEvents: 'auto',
        backgroundColor: 'transparent',
        borderColor: 'border',
        '&.disabled': {
          pointerEvents: 'none',
          backgroundColor: 'muted',
        },
        '&.error': {
          borderColor: 'red.200',
          'label ': {
            color: 'red.200',
          },
        },
        '&:not(.error).focused': {
          borderColor: 'blue.300',
          'label ': {
            color: 'blue.300',
          },
        },
        '&:not(.error):hover': { borderColor: 'blue.300', color: 'blue.300', '&>label': { color: 'blue.300' } },
        '&:focus-within': { boxShadow: 'outline' },
        'label ': {
          px: 12,
          height: 18,
          fontFamily: 'body',
          fontWeight: 'medium',
          fontSize: 0,
          color: 'label',
        },
        'input ': {
          flex: 1,
          minHeight: 24,
          fontFamily: 'body',
          fontSize: 1,
          color: 'text',
          border: 'none',
          padding: '4px 12px 4px 12px !important',
          margin: '0 !important',
          '--theme-ui-input-autofill-bg': 'transparent',
          '&:focus-visible': {
            outline: 'none',
          },
          '::placeholder': {
            color: 'placeholder',
          },
        },
      },
      'picker-input': {
        display: 'flex',
        flexDirection: 'column',
        px: 0,
        py: '4px',
        height: 60,
        border: '1px solid',
        borderRadius: 'base',
        outline: 'none',
        pointerEvents: 'auto',
        backgroundColor: 'transparent',
        borderColor: 'border',
        '&.disabled': {
          pointerEvents: 'none',
          backgroundColor: 'muted',
        },
        '&:.focused': {
          borderColor: 'blue.300',
          'label ': {
            color: 'blue.300',
          },
        },
        '&:hover': { borderColor: 'blue.300', color: 'blue.300', '&>label': { color: 'blue.300' } },
        '&:focus-within': { boxShadow: 'outline' },
        'label ': {
          px: 12,
          height: 18,
          fontFamily: 'body',
          fontWeight: 'medium',
          fontSize: 0,
          color: 'label',
        },
        '.content': {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'flex-end',
          width: '100%',
          padding: '4px 12px 4px 12px !important',
          '&>div': {
            flex: 1,
            minHeight: 24,
            fontFamily: 'body',
            fontSize: 1,
            color: 'text',
            border: 'none',
          },
        },
      },
    },
    modals: {
      backdrop: {
        zIndex: 'backdrop',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'dark.transparent',
      },
      content: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 16,
        paddingBottom: 24,
        justifyContent: 'flex-start',
      },
      footer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
      },
      title: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        '&>button': {
          position: 'absolute',
          top: 20,
          right: 20,
          height: 16,
          width: 16,
          padding: 0,
          '&>svg': {
            height: 16,
            width: 16,
            color: 'blue.300',
          },
        },
      },
      default: {
        position: 'relative',
        backgroundColor: 'modalBackground',
        color: 'text',
        display: 'flex',
        flexDirection: 'column',
        padding: 24,
        marginY: 'auto',
        maxWidth: 600,
        zIndex: 'modal',
        boxShadow: 'dark-lg',
      },
      dialog: {
        varian: 'modals.default',
        padding: 64,
        paddingY: 48,
      },
    },
    zIndices: {
      backdrop: 100,
      modal: 110,
    },
  } as Theme;

  return customTheme;
})();

export type ExactTheme = typeof theme;

export default theme;
