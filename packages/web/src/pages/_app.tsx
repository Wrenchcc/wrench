import * as React from 'react'
import App from 'next/app'
import { ApolloProvider } from '@apollo/react-hooks'
import { I18nextProvider, useSSR } from 'react-i18next'
import * as NProgress from 'nprogress'
import Router from 'next/router'
import nextCookies from 'next-cookies'
import { ModalProvider } from '../ui/Modal'
import Seo from '../utils/seo'
import withApollo from '../graphql/utils/withApollo'
import i18n from '../i18n'
import Header from '../components/Header'
import Promo from '../components/Promo'
import GlobalStyle from './GlobalStyle'

NProgress.configure({ showSpinner: false })
Router.onRouteChangeStart = () => NProgress.start()
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

class MyApp extends App {
  public static async getInitialProps({ Component, ctx }) {
    const cookies = nextCookies(ctx)
    const { req, res } = ctx

    const initialI18nStore = {}
    let i18nServerInstance = null
    let initialLanguage = null

    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    if (req && req.i18n) {
      req.i18n.languages.forEach(l => {
        initialI18nStore[l] = req.i18n.services.resourceStore.data[l]
      })

      initialLanguage = req.i18n.language

      req.i18n.toJSON = () => null
      i18nServerInstance = req.i18n
    }

    if (req && req.headers['cloudfront-viewer-country']) {
      res.cookie('viewer-country', req.headers['cloudfront-viewer-country'])
    }

    return {
      i18nServerInstance,
      initialI18nStore,
      initialLanguage,
      pageProps,
      viewerCountry: (req && req.headers['cloudfront-viewer-country']) || cookies['viewer-country'],
      hidePromo: cookies['show-promo-banner'],
      isAuthenticated: !!cookies.access_token,
    }
  }

  public render() {
    const { client, i18nServerInstance } = this.props

    return (
      <I18nextProvider i18n={i18nServerInstance || i18n}>
        <ApolloProvider client={client}>
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
      <ModalProvider>
        <Header isAuthenticated={isAuthenticated} />
        <Component {...pageProps} viewerCountry={viewerCountry} isAuthenticated={isAuthenticated} />
        {!hidePromo && <Promo viewerCountry={viewerCountry} paddingHorizontal />}
      </ModalProvider>
    </>
  )
}

export default withApollo(MyApp)
