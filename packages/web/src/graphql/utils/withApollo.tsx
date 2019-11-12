import Head from 'next/head'
import React from 'react'
import { getDataFromTree } from '@apollo/react-ssr'
import createClient from '../createClient'
import { getAccessToken } from '../utils/auth'
import { isBrowser } from '../../utils/platform'

export default App =>
  class Apollo extends React.Component {
    public static displayName = 'withApollo(App)'

    public static async getInitialProps(appCtx) {
      const { AppTree, ctx } = appCtx
      const apollo = createClient(
        {},
        {
          getToken: () => getAccessToken(ctx),
        }
      )
      const apolloState = {}
      const { getInitialProps } = App

      let appProps = { pageProps: {} }

      if (getInitialProps) {
        ctx.apolloClient = apollo
        appProps = await getInitialProps(appCtx)
      }

      if (ctx.res && (ctx.res.headersSent || ctx.res.finished)) {
        return {}
      }

      // Run all GraphQL queries in the component tree
      // and extract the resulting data
      if (!isBrowser) {
        try {
          await getDataFromTree(<AppTree {...appProps} apolloState={apolloState} apollo={apollo} />)
        } catch (error) {
          // Prevent Apollo Client GraphQL errors from crashing SSR.
          if (process.env.NODE_ENV !== 'production') {
            // tslint:disable-next-line no-console This is a necessary debugging log
            console.error('GraphQL error occurred [getDataFromTree]', error)
          }
        }

        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind()

        apolloState.data = apollo.cache.extract()
      }

      return {
        ...appProps,
        apolloState,
      }
    }

    public apollo

    constructor(props) {
      super(props)
      this.apollo = createClient(props.apolloState.data, {
        getToken: () => getAccessToken(),
      })
    }

    public render() {
      return <App {...this.props} client={this.apollo} />
    }
  }
