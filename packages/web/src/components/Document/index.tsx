// @ts-nocheck
import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import React, { ElementType } from 'react'
import { ServerStyleSheet } from 'styled-components'

export default class Document extends NextDocument {
  public static async getInitialProps(ctx: any) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App: ElementType) => (props: object) =>
            sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await NextDocument.getInitialProps(ctx)

      return {
        ...initialProps,
        initialLanguage: ctx.res.cachedUserLanguage,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <Html lang={this.props?.initialLanguage}>
        <Head />

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
