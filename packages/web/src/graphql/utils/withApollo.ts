import Head from 'next/head'
import React from 'react'
import * as blah from 'react-apollo-hooks'
import { renderToString } from 'react-dom/server'
import createClient from '../createClient'

const isBrowser = typeof window !== 'undefined'

export default App => class Apollo extends React.Component {
    public static displayName = 'withApollo(App)'

    public static async getInitialProps(ctx) {
      const { Component, router } = ctx

      let appProps = {}
      if (App.getInitialProps) {
        appProps = await App.getInitialProps(ctx)
      }

      // Run all GraphQL queries in the component tree
      // and extract the resulting data
      const apollo = createClient()
      if (!isBrowser) {
        try {
          // Run all GraphQL queries
          await blah.getMarkupFromTree({
            renderFunction: renderToString,
            tree: <App {...appProps} Component={Component} router={router} apolloClient={apollo} />,
          })
        } catch (error) {
          // Prevent Apollo Client GraphQL errors from crashing SSR.
          // Handle them in components via the data.error prop:
          // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
          console.error('Error while running `getDataFromTree`', error)
        }

        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind()
      }

      // Extract query data from the Apollo store
      const apolloState = apollo.cache.extract()

      return {
        ...appProps,
        apolloState,
      }
    }

    private apolloClient

    constructor(props) {
      super(props)
      this.apolloClient = createClient(props.apolloState)
    }

    public render() {
      return <App {...this.props} apolloClient={this.apolloClient} />
    }
}
