import React from 'react'
import NextApp from 'next/app'
import Router from 'next/router'
import NProgress from 'nprogress'
import ApolloClient from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import withApollo from 'hocs/withApollo'
import GoogleAnalyticsSDK from 'components/GoogleAnalyticsSDK'
import GoogleAnalytics from 'services/google-analytics'
import GlobalStyle from 'ui/GlobalStyle'
import { ModalProvider } from 'ui/Modal'
import Seo from 'utils/seo'
import Header from 'components/Header'

interface Props {
  apollo: ApolloClient<any>
  err?: any
}

class App extends NextApp<Props> {
  public render() {
    const { Component, pageProps, apollo } = this.props

    // https://github.com/zeit/next.js/issues/8592
    const { err } = this.props

    return (
      <>
        <GlobalStyle />
        <Seo />
        <GoogleAnalyticsSDK />

        <ApolloProvider client={apollo}>
          <ModalProvider>
            <Header isAuthenticated={false} />
            <Component {...pageProps} err={err} />
          </ModalProvider>
        </ApolloProvider>
      </>
    )
  }
}

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', (path: string) => {
  NProgress.done()
  GoogleAnalytics.pageView(path)
})
Router.events.on('routeChangeError', () => NProgress.done())

export default withApollo(App)
