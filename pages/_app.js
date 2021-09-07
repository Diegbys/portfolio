import React from 'react';
import '../styles/globals.css'
import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import { useRouter } from 'next/router'

import AuthProvider from '../src/auth/authProvider';
import ThemeContext from '../src/context/theme';
import i18nContext from '../src/context/i18n';
import { darkTheme, lightTheme } from '../styles/themeConfig';
import es from '../src/i18n/es';
import en from '../src/i18n/en';


function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = React.useState('light');
  const themeConfig = theme == 'light' ? { ...lightTheme } : { ...darkTheme };

  const router = useRouter();
  const [i18n, setI18n] = React.useState('es');
  const i18nConfig = i18n === 'es' ? { ...es } : { ...en }

  return (
    <i18nContext.Provider value={{ i18n: i18nConfig, set: setI18n, value: i18n }}>
      <ThemeContext.Provider value={{ name: theme, set: setTheme }}>
        <ThemeProvider theme={themeConfig} >
          <AuthProvider>
            <CssBaseline />
            <Component {...pageProps} />
          </AuthProvider>
        </ThemeProvider>
      </ThemeContext.Provider>
    </i18nContext.Provider>
  );
}

export default MyApp
