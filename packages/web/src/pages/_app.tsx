import React from 'react'
import NextApp from 'next/app'
import Router from 'next/router'
import NProgress from 'nprogress'
import ApolloClient from 'apollo-client'
import { I18nextProvider } from 'react-i18next'
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
import i18n from '../i18n'

interface Props {
  apollo: ApolloClient<any>
  err?: any
  hidePromo: boolean
  viewerCountry: string
  isAuthenticated: boolean
}

class App extends NextApp<Props> {
  public static async getInitialProps({ Component, ctx }) {
    const { req } = ctx

    // const initialI18nStore = {}
    // let i18nServerInstance = null
    // let initialLanguage = null

    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return {
      // i18nServerInstance,
      // initialI18nStore,
      // initialLanguage,
      pageProps,
      viewerCountry:
        Cookie.get(Cookies.VIEWER_COUNTRY) || (req && req.headers['cloudfront-viewer-country']),
      hidePromo: !!Cookie.get(Cookies.SHOW_PROMO),
      isAuthenticated: !!Cookie.get(Cookies.ACCESS_TOKEN),
    }
  }

  public render() {
    const { Component, pageProps, apollo, hidePromo, viewerCountry, isAuthenticated } = this.props

    return (
      <I18nextProvider i18n={i18n}>
        <GlobalStyle />
        <Seo />
        <GoogleAnalyticsSDK />

        <ApolloProvider client={apollo}>
          <ModalProvider>
            <Header isAuthenticated={isAuthenticated} />
            <Component {...pageProps} />
            {!hidePromo && <Promo viewerCountry={viewerCountry} paddingHorizontal />}
          </ModalProvider>
        </ApolloProvider>
      </I18nextProvider>
    )
  }
}

Router.events.on('routeChangeError', () => NProgress.done())
Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', (path: string) => {
  NProgress.done()
  GoogleAnalytics.pageView(path)
})

export default withApollo(App)
