import Head from 'next/head'
import React from 'react'
import { getMarkupFromTree } from 'react-apollo-hooks'
import { renderToString } from 'react-dom/server'
import createClient from '../createClient'
import { getTokens } from '../utils/auth'
import { isBrowser } from '../../utils/platform'

export default App => class Apollo extends React.Component {
    public static displayName = 'withApollo(App)'

    public static async getInitialProps(appCtx) {
      const { Component, router, ctx } = appCtx
      const accesToken = getTokens(appCtx.ctx, 'access_token')
      const apollo = createClient({}, accesToken)
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
          // Run all GraphQL queries
          await getMarkupFromTree({
            renderFunction: renderToString,
            tree: <App {...appProps} Component={Component} router={router} client={apollo} />,
          })
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
        accesToken,
      }
    }

    public apollo

    constructor(props) {
      super(props)
      this.apollo = createClient(props.apolloState.data, props.accesToken)
    }

    public render() {
      return <App {...this.props} client={this.apollo} />
    }
}
