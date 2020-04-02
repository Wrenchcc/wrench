import gql from 'graphql-tag'

export default gql`
  enum ReportType {
    PROJECT
    USER
    COMMENT
    POST
  }

  extend type Mutation {
    report(id: ID!, type: ReportType!): Boolean
  }
`
