import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    background: {
      default: '#161a1e',
      paper: '#222b36'
    },
    text: {
      primary: '#fefefe',
      secondary: '#bdbdbd',
      disabled: '#bdbdbd'
    },
    primary: {
      main: '#13c980'
    },
    secondary: {
      main: '#de4557'
    },
    info: {
      main: '#E7C533'
    },
    error: {
      main: red.A400
    }
  },

  components: {
    MuiInputBase: {
      styleOverrides: {
        input: {
          '&::placeholder': {
            // opacity: 0.86,
            color: '#2C3139'
          }
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          '&:onfocus': {
            borderRadius: 20,
            borderColor: '#E7C533'
          }
        }
      }
    }
  },
  shape: {
    borderRadius: 4
  },
  direction: 'ltr',
  typography: {
    fontFamily: 'Source Sans Pro, Helvetica, Arial, Roboto',
    h1: {
      fontSize: 64,
      fontWeight: 700,
      lineHeight: 1.5
    },
    h2: {
      fontSize: 40,
      fontWeight: 700,
      lineHeight: 1.5
    },
    h3: {
      fontSize: 28,
      fontWeight: 700,
      lineHeight: 1.5
    },
    h4: {
      fontSize: 24,
      fontWeight: 700,
      lineHeight: 1.5
    },
    h6: {
      fontSize: 40,
      fontWeight: 700,
      lineHeight: 1.5
    },
    subtitle1: {
      fontSize: 24,
      fontWeight: 400,
      lineHeight: 1.5
    },
    subtitle2: {
      fontSize: 20,
      fontWeight: 600,
      lineHeight: 1.5
    },
    body1: {
      fontSize: 16,
      fontWeight: 700,
      lineHeight: 1.5
    },
    body2: {
      fontSize: 16,
      fontWeight: 400,
      lineHeight: 1.5
    },
    button: {
      fontWeight: 600,
      lineHeight: 1.5
    },
    caption: {
      fontSize: 12,
      fontWeight: 400,
      lineHeight: 1.5
    },
    overline: {
      fontSize: 12,
      fontWeight: 700,
      lineHeight: 1.5
    }
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 375,
      md: 765,
      lg: 1440,
      xl: 1920
    }
  }
});

export default theme;
