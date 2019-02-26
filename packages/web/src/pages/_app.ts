import * as React from 'react'
import App, { Container } from 'next/app'
import { ApolloProvider } from 'react-apollo-hooks'
import { I18nextProvider, useSSR } from 'react-i18next'
import NextSeo from 'next-seo'
import * as NProgress from 'nprogress'
import Router from 'next/router'
import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'
import withApollo from '../graphql/utils/withApollo'
import i18n from '../i18n'
import { Header } from '../ui'
import config from '../../next-seo.config'

NProgress.configure({ showSpinner: false })
Router.onRouteChangeStart = () => NProgress.start()
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

const GlobalStyle = createGlobalStyle`
  ${reset}
  @supports (font-variation-settings: normal) {
    body {
      font-family: 'Inter var', system-ui, sans-serif;
    }
  }

  input[type="search"] {
    -webkit-appearance: textfield;
  }

  a {
    text-decoration: none;
  }

  #nprogress {
    pointer-events: none;
  }

  #nprogress .bar {
    background: black;
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
  }

  #nprogress .peg {
    display: block;
    position: absolute;
    right: 0px;
    width: 100px;
    height: 100%;
    box-shadow: 0 0 10px #29d, 0 0 5px #29d;
    opacity: 1.0;
    transform: rotate(3deg) translate(0px, -4px);
  }
`

class MyApp extends App {
  public static async getInitialProps({ Component, ctx }) {
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
    }
  }

  constructor(props) {
    super(props)
  }

  render() {
    const {
      Component,
      pageProps,
      apolloClient,
      i18nServerInstance,
      initialI18nStore,
      initialLanguage,
    } = this.props

    return (
      <ApolloProvider client={apolloClient}>
        <I18nextProvider i18n={i18nServerInstance || i18n}>
          <AppWithi18n
            Component={Component}
            pageProps={pageProps}
            i18nServerInstance={i18nServerInstance}
            initialI18nStore={initialI18nStore}
            initialLanguage={initialLanguage}
          />
        </I18nextProvider>
      </ApolloProvider>
    )
  }
}

function AppWithi18n({ initialI18nStore, initialLanguage, pageProps, Component }) {
  useSSR(initialI18nStore, initialLanguage)

  return (
    <Container>
      <GlobalStyle />
      <NextSeo config={config} />
      <Header />
      <Component {...pageProps} />
    </Container>
  )
}

export default withApollo(MyApp)
