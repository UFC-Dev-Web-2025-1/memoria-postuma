import { createTheme, Theme } from '@mui/material/styles';

const theme: Theme = createTheme({
  palette: {
    primary: {
      main: '#99BC85',
    },
    secondary: {
      main: '#E4EFE7',
    },
    error: {
      main: '#f44336',
    },
    warning: {
      main: '#ff9800',
    },
    info: {
      main: '#FDFAF6',
    },
    success: {
      main: '#4caf50',
    },
  },
});

export default theme;
