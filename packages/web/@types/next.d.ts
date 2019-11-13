import { NextPageContext as _NextPageContext } from 'next'
import ApolloClient from 'apollo-client'

declare module 'next' {
  export interface NextPageContext extends _NextPageContext {
    apolloClient: ApolloClient<any>
  }
}
