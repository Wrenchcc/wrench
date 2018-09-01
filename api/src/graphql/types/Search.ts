export default `
  enum SearchType {
    PROJECTS
    USERS
  }

  union SearchResultNode = Project | User

  type SearchResultEdge {
    cursor: String!
    node: SearchResultNode
  }

  type SearchResultsConnection {
    edges: [SearchResultEdge]
    pageInfo: PageInfo
  }

  extend type Query {
		search(first: Int, after: String, query: String!, type: SearchType!): SearchResultsConnection
	}
`
