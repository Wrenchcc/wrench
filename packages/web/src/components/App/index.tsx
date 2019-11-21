// @ts-nocheck
import React from 'react'
import NextApp from 'next/app'
import Router from 'next/router'
import NProgress from 'nprogress'
import ApolloClient from 'apollo-client'
import { I18nextProvider, useSSR } from 'react-i18next'
import { ApolloProvider } from 'react-apollo'
import withApollo from 'graphql/withApollo'
import GoogleAnalyticsSDK from 'components/GoogleAnalyticsSDK'
import Promo from 'components/Promo'
import GoogleAnalytics from 'services/google-analytics'
import GlobalStyle from 'ui/GlobalStyle'
import { ModalProvider } from 'ui/Modal'
import Seo from 'utils/seo'
import Header from 'components/Header'
import Cookie, { Cookies } from 'services/cookie'
import resources from 'translations/index.json'
import i18n, { SUPPORTED_LOCALS } from 'i18n'

interface Props {
  apollo: ApolloClient<any>
  err?: any
  hidePromo: boolean
  viewerCountry: string
  isAuthenticated: boolean
}

const CLOUDFRONT_COUNTRY_VIEWER = 'cloudfront-viewer-country'
const ACCEPT_LANGUAGE = 'accept-language'

Router.events.on('routeChangeError', () => NProgress.done())
Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', (path: string) => {
  NProgress.done()
  GoogleAnalytics.pageView(path)
})

class App extends NextApp<Props> {
  public static async getInitialProps({ Component, ctx, router }) {
    const { req } = ctx
    const initialI18nStore = {}
    let i18nServerInstance = null
    let initialLanguage = null

    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    SUPPORTED_LOCALS.forEach(l => {
      initialI18nStore[l] = resources[l]
    })

    const queryLanguage = router.query.hl

    initialLanguage =
      queryLanguage ||
      Cookie.get(Cookies.PREFERRED_LANGUAGE) ||
      (req && req.headers[ACCEPT_LANGUAGE])

    // Set lanugage
    if (queryLanguage || (req && req.headers[ACCEPT_LANGUAGE])) {
      Cookie.set(Cookies.PREFERRED_LANGUAGE, queryLanguage || req.headers[ACCEPT_LANGUAGE])
    }

    if (req && req.headers[CLOUDFRONT_COUNTRY_VIEWER]) {
      Cookie.set(Cookies.VIEWER_COUNTRY, req.headers[CLOUDFRONT_COUNTRY_VIEWER])
    }

    return {
      i18nServerInstance,
      initialI18nStore,
      initialLanguage,
      pageProps,
      viewerCountry:
        Cookie.get(Cookies.VIEWER_COUNTRY) ||
        (req && req.headers[CLOUDFRONT_COUNTRY_VIEWER]) ||
        'us',
      hidePromo: !!Cookie.get(Cookies.SHOW_PROMO),
      isAuthenticated: !!Cookie.get(Cookies.ACCESS_TOKEN),
    }
  }

  public render() {
    const { apollo } = this.props

    return (
      <I18nextProvider i18n={i18n}>
        <ApolloProvider client={apollo}>
          <AppWithi18n {...this.props} />
        </ApolloProvider>
      </I18nextProvider>
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

  return (
    <>
      <GlobalStyle />
      <Seo />
      <GoogleAnalyticsSDK />

      <ModalProvider>
        <Header isAuthenticated={isAuthenticated} />
        <Component {...pageProps} viewerCountry={viewerCountry} isAuthenticated={isAuthenticated} />
        {!hidePromo && !isAuthenticated && (
          <Promo viewerCountry={viewerCountry} paddingHorizontal />
        )}
      </ModalProvider>
    </>
  )
}

export default withApollo(App)
