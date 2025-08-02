import { createTheme, Theme } from '@mui/material/styles';

const theme: Theme = createTheme({
  palette: {
    primary: {
      main: '#3C68AE',
    },
    secondary: {
      main: '#8AABE0',
    },
    error: {
      main: '#f44336',
    },
    warning: {
      main: '#ffffffff',
    },
    info: {
      main: '#5F6368',
    },
    success: {
      main: '#4caf50',
    },
  },
});

export default theme;
