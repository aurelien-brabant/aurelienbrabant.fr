import React from 'react';
import '../styles/globals.css'
import '@fontsource/roboto'
import '@fontsource/roboto/700.css'
import type { AppProps } from 'next/app'
import {Layout} from '../components/layout/Layout'
import Router from 'next/router';
import NProgress from 'nprogress';
import '../public/nprogress.css';
import Head from 'next/head';

import LanguageContext from '../context/language';
import { Language } from '../data/dict';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <LanguageContext.Provider value={Language.FR}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      </LanguageContext.Provider>
    </React.Fragment>
  )
}

export default MyApp
