import { makeExecutableSchema } from 'graphql-tools'

import scalars from './types/scalars'
import generalTypes from './types/general'

// Types
import Auth from './types/Auth'
import Comment from './types/Comment'
import Reply from './types/Reply'
import Notification from './types/Notification'
import Post from './types/Post'
import Project from './types/Project'
import Followers from './types/Followers'
import Search from './types/Search'
import User from './types/User'
import Image from './types/Image'

// Resolvers
import resolvers from './resolvers'

const Root = `
  # The dummy queries and mutations are necessary because
  # graphql-js cannot have empty root types and we only extend
  # these types later on
  # Ref: apollographql/graphql-tools#293

  type Query {
    dummy: String
  }

  type Mutation {
    dummy: String
  }

  schema {
    query: Query
    mutation: Mutation
  }
`

export default makeExecutableSchema({
  typeDefs: [
    scalars.typeDefs,
    generalTypes,
    Root,
    Auth,
    Comment,
    Reply,
    Notification,
    Post,
    Project,
    Followers,
    Search,
    User,
    Image,
  ],
  resolvers,
})
