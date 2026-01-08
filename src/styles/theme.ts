import { alpha, createTheme } from '@mui/material/styles';

const brandBlue = '#0b3d91';
const brandTeal = '#0e7c86';
const brandGold = '#c8922a';
const baseInk = '#1b1e1f';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: brandBlue,
      dark: '#062f6f',
      light: '#3e6dbc',
    },
    secondary: {
      main: brandTeal,
      dark: '#095f66',
      light: '#3aa0a8',
    },
    warning: {
      main: brandGold,
    },
    success: {
      main: '#2f7d4a',
    },
    background: {
      default: '#f4f1ea',
      paper: '#ffffff',
    },
    text: {
      primary: baseInk,
      secondary: '#51606a',
    },
    divider: alpha(brandBlue, 0.12),
  },
  typography: {
    fontFamily: '"Be Vietnam Pro", "Noto Sans", sans-serif',
    h1: {
      fontFamily: '"Spectral", serif',
      fontWeight: 600,
      fontSize: '2.85rem',
      lineHeight: 1.15,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontFamily: '"Spectral", serif',
      fontWeight: 600,
      fontSize: '2.1rem',
      lineHeight: 1.2,
    },
    h3: {
      fontFamily: '"Spectral", serif',
      fontWeight: 600,
      fontSize: '1.6rem',
      lineHeight: 1.3,
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.2rem',
      lineHeight: 1.35,
    },
    subtitle1: {
      fontWeight: 500,
      fontSize: '1rem',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      letterSpacing: '0.01em',
    },
  },
  shape: {
    borderRadius: 18,
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 999,
          paddingInline: 20,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: `1px solid ${alpha(brandBlue, 0.08)}`,
          boxShadow: '0 12px 28px rgba(10, 35, 80, 0.08)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          fontWeight: 500,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
        },
      },
    },
  },
});

export default theme;
