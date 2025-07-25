import gql from 'graphql-tag'

export default gql`
  type BlogPost @cacheControl(maxAge: 180) {
    id: ID
    createdAt: Date
    updatedAt: Date
    title: String
    content: String
    user: User
    slug: String
  }

  type BlogPostConnection {
    totalCount: Int
    pageInfo: PageInfo!
    edges: [BlogPostEdge!]
  }

  type BlogPostEdge {
    cursor: String!
    node: BlogPost!
  }

  extend type Query {
    blogPost(slug: LowercaseString, id: ID): BlogPost
    blogPosts(first: Int = 10, after: String, last: Int = 10, before: String): BlogPostConnection
      @cacheControl(maxAge: 360)
  }

  input BlogPostInput {
    title: String!
    content: String!
  }

  extend type Mutation {
    deleteBlogPost(id: ID!): BlogPost
    addBlogPost(id: ID, input: BlogPostInput!): BlogPost
  }
`
