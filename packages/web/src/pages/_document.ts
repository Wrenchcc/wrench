import Document, { Head, Main, NextScript } from 'next/document'
import { I18nextProvider, useSSR } from 'react-i18next'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet()

    const originalRenderPage = ctx.renderPage

    ctx.renderPage = () => originalRenderPage({
      enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
    })

    const initialProps = await Document.getInitialProps(ctx)

    return {
      ...initialProps,
      initialI18nStore: ctx.req.i18n.services.resourceStore.data,
      // @ts-ignore
      styles: [...initialProps.styles, ...sheet.getStyleElement()],
      locale: ctx.req.i18n.language,
      i18n: ctx.req.i18n,
    }
  }

  render() {
    const { initialI18nStore, locale, i18n } = this.props

    // useSSR(initialI18nStore, locale)

    return (
      <I18nextProvider i18n={i18n}>
        <html lang={locale}>
          <Head>
            <meta charSet="utf-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="stylesheet" href="https://rsms.me/inter/inter.css?v=3.3" />
          </Head>
          <body>
            <Main />
            <NextScript />
          </body>
        </html>
      </I18nextProvider>
    )
  }
}
