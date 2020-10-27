// @ts-nocheck
import React from 'react'
import NextApp from 'next/app'
import Cookie, { Cookies } from 'services/cookie'
import Router from 'next/router'
import NProgress from 'nprogress'
import { Reset } from 'styled-reset'
import { ThemeProvider as NextThemeProvider, useTheme } from 'next-themes'
import { ThemeProvider } from '@wrench/ui'
import withApollo from 'services/apollo/withApollo'
import GoogleAnalyticsSDK from 'components/GoogleAnalyticsSDK'
import Promo from 'components/Promo'
import GoogleAnalytics from 'services/google-analytics'
import GlobalStyle from 'ui/GlobalStyle'
import { ModalProvider } from 'ui/Modal'
import Seo from 'utils/seo'
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

const CLOUDFRONT_COUNTRY_VIEWER = 'cloudfront-viewer-country'

Router.events.on('routeChangeError', () => NProgress.done())
Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', (path: string) => {
  NProgress.done()
  GoogleAnalytics.pageView(path)
})

class App extends NextApp<Props> {
  public static async getInitialProps({ Component, ctx, router }) {
    const { req } = ctx
    const cookies = Cookie.init(req && req.headers.cookie)

    const initialI18nStore = {}
    let i18nServerInstance = null

    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    const queryLanguage = router.query.hl
    const initialLanguage = queryLanguage || cookies.get(Cookies.PREFERRED_LANGUAGE) || 'en'

    // Set new lanugage
    if (queryLanguage) {
      cookies.set(Cookies.PREFERRED_LANGUAGE, queryLanguage)
    }

    if (req && req.headers[CLOUDFRONT_COUNTRY_VIEWER]) {
      cookies.set(Cookies.VIEWER_COUNTRY, req.headers[CLOUDFRONT_COUNTRY_VIEWER])
    }

    return {
      i18nServerInstance,
      initialI18nStore,
      initialLanguage,
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
      <NextThemeProvider enableSystem defaultTheme="system">
        <Wrench {...this.props} />
      </NextThemeProvider>
    )
  }
}

function Wrench({
  pageProps,
  Component,
  hidePromo,
  viewerCountry,
  isAuthenticated,
}) {
  const { systemTheme } = useTheme()

  return (
    <>
      <Reset />
      <GlobalStyle />
      <Seo />
      <GoogleAnalyticsSDK />

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

export default appWithTranslation(withApollo(App))
