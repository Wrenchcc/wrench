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

  directive @deprecated(reason: String = "No longer supported") on FIELD_DEFINITION | ENUM_VALUE
`
