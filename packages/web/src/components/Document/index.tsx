// @ts-nocheck
import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import React, { ElementType } from 'react'
import { ServerStyleSheet } from 'styled-components'
import GoogleAnalyticsSDK from 'components/GoogleAnalyticsSDK'

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

        <GoogleAnalyticsSDK />

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
