import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
    typography: {
        subtitle1: {
            fontSize: '0.8rem'
        },
        body1: {
            marginBottom: '10px',
            fontSize: '0.9rem',
            lineHeight: '1.5rem'
        },
        h4: {
            fontSize: '1.5rem'
        },
        h5: {
            fontSize: '1.15rem'
        }
    },
    palette: {
        background: {
            default: '#FFFFFF'
            // grey: '#F5F5F5',
        },
        warning: {
            main: '#ff6600'
        },
        primary: {
            main: '#E5012B'
        },
        secondary: {
            main: '#EAEBE1'
        },
        // tertiary: {
        //   main: '#33D398',
        // },
        text: {
            // dark: '#000000', typescript error
            primary: '#666666'
            // white: '#FFFFFF',
        }
    }
});

export default theme;
