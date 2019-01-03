import gql from 'graphql-tag'

export default gql`
  enum SearchType {
    PROJECTS
    USERS
    MODELS
  }

  union SearchResultNode = Project | User | Model

  type SearchResultEdge {
    cursor: String!
    node: SearchResultNode
  }

  type SearchResults {
    edges: [SearchResultEdge]
    pageInfo: PageInfo
  }

  extend type Query {
    search(
      # Returns the first *n* results from the list
      first: Int = 10
      # Returns the elements in the list that come after the specified ID
      after: String
      # Returns the last *n* results from the list
      last: Int
      # Returns the elements in the list that come before the specified ID
      before: String
      # The string typed by the user to search for
      query: String!
      # The types of items that can be searched
      type: SearchType!
    ): SearchResults
  }
`
