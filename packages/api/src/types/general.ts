import gql from 'graphql-tag'

export default gql`
  type PageInfo {
    hasNextPage: Boolean
    hasPreviousPage: Boolean
  }

  enum PlatformType {
    MOBILE
    WEB
  }
`
