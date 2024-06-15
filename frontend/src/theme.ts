import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#5ACCCC', // Turquoise
      contrastText: '#FFFFFF', // White
    },
    secondary: {
      main: '#FABD33', // Yellow
      contrastText: '#335C6E', // Steel Blue
    },
    info: {
      main: '#CFFAFA', // Turquoise Light //335C6E
    },
    error: {
      main: '#F76434', // Orange Red
    },
    success: {
      main: '#4AA088', // Teal
    },
    warning: {
      main: '#FAAD00', // Yellow dark
    },
    text: {
      primary: '#53C2C2', // Turquoise dark 1
      secondary: '#FFE6DC', // orange Pastel
      disabled: '#28B8B8', // Turquoise dark 2
    },
    background: {
      default: '#FFFFFF', // White
    },
    
  },
  typography: {
    fontFamily: 'Mulish, Roboto, Arial, sans-serif',
  },
});

export default theme;
