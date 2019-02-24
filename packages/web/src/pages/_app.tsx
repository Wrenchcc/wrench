import * as React from 'react'
import App, { Container } from 'next/app'
import { I18nextProvider, useSSR } from 'react-i18next'
import NextSeo from 'next-seo'
import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'
import i18n from '../i18n'
import { Header } from '../ui'
import config from '../../next-seo.config'

const GlobalStyle = createGlobalStyle`
  ${reset}
  @supports (font-variation-settings: normal) {
    body {
      font-family: 'Inter var', system-ui, sans-serif;
    }

    a {
      text-decoration: none;
    }
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

  render() {
    const {
      Component,
      pageProps,
      // @ts-ignorer
      i18nServerInstance,
      // @ts-ignore
      initialI18nStore,
      // @ts-ignore
      initialLanguage,
    } = this.props
    // @ts-ignore
    return (
      <I18nextProvider i18n={i18nServerInstance || i18n}>
        // @ts-ignore
        <AppWithi18n
          Component={Component}
          pageProps={pageProps}
          i18nServerInstance={i18nServerInstance}
          initialI18nStore={initialI18nStore}
          initialLanguage={initialLanguage}
        />
      </I18nextProvider>
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

export default MyApp
