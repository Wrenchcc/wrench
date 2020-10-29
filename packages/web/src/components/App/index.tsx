// @ts-nocheck
import React from 'react'
import NextApp from 'next/app'
import Cookie, { Cookies } from 'services/cookie'
import Router from 'next/router'
import NProgress from 'nprogress'
import { ThemeProvider as NextThemeProvider, useTheme } from 'next-themes'
import { ThemeProvider } from '@wrench/ui'
import withApollo from 'services/apollo/withApollo'
import { Reset } from 'styled-reset'
import GlobalStyle from 'ui/GlobalStyle'
import Seo from 'utils/seo'
import Promo from 'components/Promo'
import GoogleAnalytics from 'services/google-analytics'
import { ModalProvider } from 'ui/Modal'
import Header from 'components/Header'
import Hide from 'components/Hide'
import { appWithTranslation } from 'i18n'

interface Props {
  apollo: ApolloClient<any>
  err?: any
  hidePromo: boolean
  viewerCountry: string
  isAuthenticated: boolean
}

const SET_COOKIE_HEADER = 'Set-Cookie'
const CLOUDFRONT_COUNTRY_VIEWER = 'cloudfront-viewer-country'

Router.events.on('routeChangeError', () => NProgress.done())
Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', (path: string) => {
  NProgress.done()
  GoogleAnalytics.pageView(path)
})

class App extends NextApp<Props> {
  public static async getInitialProps({ Component, ctx }) {
    const { req, res } = ctx
    const cookies = Cookie.init(req && req.headers.cookie)

    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    if (req?.headers[CLOUDFRONT_COUNTRY_VIEWER]) {
      res.setHeader(
        SET_COOKIE_HEADER,
        `${Cookies.VIEWER_COUNTRY}=${req.headers[CLOUDFRONT_COUNTRY_VIEWER]}; path=/;`
      )
    }
    return {
      pageProps,
      viewerCountry:
        (req && req.headers[CLOUDFRONT_COUNTRY_VIEWER]) ||
        cookies.get(Cookies.VIEWER_COUNTRY) ||
        'US',
      hidePromo: cookies.get(Cookies.SHOW_PROMO),
      isAuthenticated: !!cookies.get(Cookies.ACCESS_TOKEN),
    }
  }

  public render() {
    return (
      <>
        <Reset />
        <GlobalStyle />
        <Seo />

        <NextThemeProvider enableSystem defaultTheme="system">
          <AppWithi18n {...this.props} />
        </NextThemeProvider>
      </>
    )
  }
}

function AppWithi18n({ pageProps, Component, hidePromo, viewerCountry, isAuthenticated }) {
  const { systemTheme } = useTheme()

  return (
    <>
      <ThemeProvider mode={systemTheme}>
        <ModalProvider>
          <Header isAuthenticated={isAuthenticated} />
          <Component
            {...pageProps}
            viewerCountry={viewerCountry}
            isAuthenticated={isAuthenticated}
          />
          {!hidePromo && !isAuthenticated && (
            <Hide on="tablet">
              <Promo viewerCountry={viewerCountry} paddingHorizontal />
            </Hide>
          )}
        </ModalProvider>
      </ThemeProvider>
    </>
  )
}

export default withApollo(appWithTranslation(App))
