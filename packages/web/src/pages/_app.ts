import * as React from 'react'
import App, { Container } from 'next/app'
import { ApolloProvider } from 'react-apollo-hooks'
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
    const { req } = ctx

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

    return {
      i18nServerInstance,
      initialI18nStore,
      initialLanguage,
      pageProps,
      viewerCountry: req.headers['cloudfront-viewer-country'],
      hidePromo: cookies['show-promo-banner'],
    }
  }

  render() {
    const {
      Component,
      pageProps,
      client,
      i18nServerInstance,
      initialI18nStore,
      initialLanguage,
      hidePromo,
      viewerCountry,
    } = this.props

    return (
      <ApolloProvider client={client}>
        <I18nextProvider i18n={i18nServerInstance || i18n}>
          <AppWithi18n
            Component={Component}
            hidePromo={hidePromo}
            pageProps={pageProps}
            viewerCountry={viewerCountry}
            i18nServerInstance={i18nServerInstance}
            initialI18nStore={initialI18nStore}
            initialLanguage={initialLanguage}
          />
        </I18nextProvider>
      </ApolloProvider>
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
}) {
  useSSR(initialI18nStore, initialLanguage)

  return (
    <Container>
      <GlobalStyle />
      <Seo />
      <ModalProvider>
        <Header />
        <Component {...pageProps} />
        {!hidePromo && <Promo viewerCountry={viewerCountry} />}
      </ModalProvider>
    </Container>
  )
}

export default withApollo(MyApp)
