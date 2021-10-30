import React from 'react';
import '../styles/globals.scss'
import '@fontsource/roboto'
import '@fontsource/roboto/700.css'
import type { AppProps } from 'next/app'
import {Layout} from '../components/layout/Layout'
import Router from 'next/router';
import NProgress from 'nprogress';
import '../styles/nprogress.css';

import LanguageProvider from '../context/language/LanguageProvider';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <LanguageProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      </LanguageProvider>
    </React.Fragment>
  )
}

export default MyApp;
