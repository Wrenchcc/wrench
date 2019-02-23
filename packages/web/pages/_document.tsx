import Document, { Head, Main, NextScript } from 'next/document'
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
      // @ts-ignore
      styles: [...initialProps.styles, ...sheet.getStyleElement()],
    }
  }

  render() {
    return (
      <html>
        <Head>
          <link rel="stylesheet" href="https://rsms.me/inter/inter.css?v=3.3" />
        </Head>
        <body className="custom_class">
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
