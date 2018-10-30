export default `
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

  type SearchResultsConnection {
    edges: [SearchResultEdge]
    pageInfo: PageInfo
  }

  extend type Query {
		search(first: Int, after: String, query: String!, type: SearchType!): SearchResultsConnection
	}
`
