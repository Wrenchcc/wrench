import * as React from 'react'
import App, { Container } from 'next/app'
import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'
import { Header } from '../ui'

const GlobalStyle = createGlobalStyle`
  ${reset}
  @supports (font-variation-settings: normal) {
  body {
    font-family: 'Inter var', system-ui, sans-serif;
  }
}

`

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <Container>
        <GlobalStyle />
        <Header />
        <Component {...pageProps} />
      </Container>
    )
  }
}

export default MyApp
