import * as React from 'react'
import App, { Container } from 'next/app'
import NextSeo from 'next-seo'
import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'
import { Header } from '../ui'
import SEO from '../../next-seo.config'

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
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return {
      pageProps,
    }
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <Container>
        <GlobalStyle />
        <NextSeo config={SEO} />
        <Header />
        <Component {...pageProps} />
      </Container>
    )
  }
}

export default MyApp
