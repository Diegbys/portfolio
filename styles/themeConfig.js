import { createTheme } from '@material-ui/core/styles';

const coreThemeObj = {
    shape: {
        borderRadius: 6
    },
    palette: {
        primary: {
            main: "#1976d2"
        },
    },
}

export const darkTheme = createTheme({
    ...coreThemeObj,
    palette: {
        type: 'dark',
        ...coreThemeObj.palette
    },
});

export const lightTheme = createTheme({
    ...coreThemeObj,
    palette: {
        type: 'light',
        ...coreThemeObj.palette
    },
});