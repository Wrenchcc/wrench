// @ts-nocheck
import React from 'react'
import Head from 'next/head'
import NextApp from 'next/app'
import Cookie from 'services/cookie'
import Router from 'next/router'
import NProgress from 'nprogress'
import { Reset } from 'styled-reset'
import { ThemeProvider as NextThemeProvider, useTheme } from 'next-themes'
import { ThemeProvider } from '@wrench/ui'
import { I18nextProvider, useSSR } from 'react-i18next'
import withApollo from 'services/apollo/withApollo'
import AuthLink from 'services/apollo/links/Auth'
import GoogleAnalyticsSDK from 'components/GoogleAnalyticsSDK'
import Promo from 'components/Promo'
import GoogleAnalytics from 'services/google-analytics'
import GlobalStyle from 'ui/GlobalStyle'
import { ModalProvider } from 'ui/Modal'
import Seo from 'utils/seo'
import Header from 'components/Header'
import Hide from 'components/Hide'
import { Cookies } from 'services/cookie'
import resources from 'translations/index.json'
import i18n, { SUPPORTED_LOCALS } from 'i18n'

const SET_COOKIE_HEADER = 'Set-Cookie'

interface Props {
  apollo: ApolloClient<any>
  err?: any
  hidePromo: boolean
  viewerCountry: string
  isAuthenticated: boolean
}

const CLOUDFRONT_COUNTRY_VIEWER = 'cloudfront-viewer-country'

Router.events.on('routeChangeError', () => NProgress.done())
Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', (path: string) => {
  NProgress.done()
  GoogleAnalytics.pageView(path)
})

class App extends NextApp<Props> {
  public static async getInitialProps({ Component, ctx, router }) {
    const { req, res } = ctx
    const cookies = Cookie.init(req && req.headers.cookie)

    const initialI18nStore = {}
    let i18nServerInstance = null

    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    SUPPORTED_LOCALS.forEach((l) => {
      initialI18nStore[l] = resources[l]
    })

    const queryLanguage = router.query.hl

    const initialLanguage = queryLanguage || cookies.get(Cookies.PREFERRED_LANGUAGE) || 'en'

    // Set new lanugage
    if (queryLanguage && req && req.headers[CLOUDFRONT_COUNTRY_VIEWER]) {
      res.setHeader(SET_COOKIE_HEADER, `${Cookies.PREFERRED_LANGUAGE}=${queryLanguage}; path=/;`)
    }

    if (req && req.headers[CLOUDFRONT_COUNTRY_VIEWER]) {
      res.setHeader(
        SET_COOKIE_HEADER,
        `${Cookies.VIEWER_COUNTRY}=${req.headers[CLOUDFRONT_COUNTRY_VIEWER]}; path=/;`
      )
    }

    return {
      i18nServerInstance,
      initialI18nStore,
      initialLanguage,
      pageProps,
      viewerCountry:
        (req && req.headers[CLOUDFRONT_COUNTRY_VIEWER]) ||
        cookies.get(Cookies.VIEWER_COUNTRY) ||
        'US',
      hidePromo: cookies.get(Cookies.SHOW_PROMO),
      isAuthenticated: !!cookies.get(Cookies.ACCESS_TOKEN),
    }
  }

  public render() {
    return (
      <NextThemeProvider enableSystem defaultTheme="system">
        <I18nextProvider i18n={i18n}>
          <AppWithi18n {...this.props} />
        </I18nextProvider>
      </NextThemeProvider>
    )
  }
}

function AppWithi18n({
  initialI18nStore,
  initialLanguage,
  pageProps,
  Component,
  hidePromo,
  viewerCountry,
  isAuthenticated,
}) {
  useSSR(initialI18nStore, initialLanguage)

  const { systemTheme } = useTheme()

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
        />
        <link
          rel="apple-touch-icon-precomposed"
          sizes="144x144"
          href="/apple-touch-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon-precomposed"
          sizes="152x152"
          href="/apple-touch-icon-152x152.png"
        />
        <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32" />
        <link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16" />
        <meta name="msapplication-TileImage" content="/mstile-144x144.png" />
      </Head>

      <Reset />
      <GlobalStyle />
      <Seo />
      <GoogleAnalyticsSDK />

      <ThemeProvider mode={systemTheme}>
        <ModalProvider>
          <Header isAuthenticated={isAuthenticated} />
          <Component {...pageProps} viewerCountry={viewerCountry} isAuthenticated={isAuthenticated} />
          {!hidePromo && !isAuthenticated && (
            <Hide on="tablet">
              <Promo viewerCountry={viewerCountry} paddingHorizontal />
            </Hide>
          )}
        </ModalProvider>
      </ThemeProvider>
    </>
  )
}

export default withApollo(App)
