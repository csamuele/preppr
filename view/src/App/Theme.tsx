import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { useEffect, useMemo } from 'react';
import Cookies from 'js-cookie';
import { useDispatch } from 'Utils/Hooks/useDispatch';
import { setDarkMode } from 'Features/ui';
import { useSelector } from 'react-redux';
import { selectIsDarkMode } from 'Features/ui';
import { useMediaQuery, Box } from '@mui/material';


import { ReactNode } from 'react';
import { dark } from '@mui/material/styles/createPalette';

type ThemeProviderProps = {
    children: ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const dispatch = useDispatch();
    const isDarkModeString = Cookies.get('isDarkMode');
    const systemMode = useMediaQuery('(prefers-color-scheme: dark)');
    let isDarkMode = isDarkModeString === 'true' ? true : false;
    if (isDarkModeString === undefined) {
        Cookies.set('isDarkMode', systemMode.toString());
        isDarkMode = systemMode;
    }
    useEffect(() => {
        dispatch(setDarkMode(isDarkMode));
    }, [isDarkMode, dispatch]);
    const darkMode = useSelector(selectIsDarkMode);
    const theme = useMemo(() => {
        return createTheme({
            palette: {
                mode: darkMode ? 'dark' : 'light',
            },
            components: {
                MuiTypography: {
                    styleOverrides: {
                        root: {
                            color: 'text.primary',
                        },
                    },
                },
            },
        });
    }, [darkMode]);
    return <MuiThemeProvider theme={theme}>
            {children}
            </MuiThemeProvider>;
}
