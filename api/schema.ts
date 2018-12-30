import { makeExecutableSchema } from 'apollo-server-express'
import * as merge from 'lodash.merge'
import scalars from './types/scalars'
import generalTypes from './types/general'

// Types
import Auth from './types/Auth'
import Comment from './types/Comment'
import Followers from './types/Followers'
import File from './types/File'
import Model from './types/Model'
import Notification from './types/Notification'
import Post from './types/Post'
import Project from './types/Project'
import Search from './types/Search'
import Upload from './types/Upload'
import User from './types/User'

// Queries
import userQueries from './queries/user'
import searchQueries from './queries/search'
import projectQueries from './queries/project'
import postQueries from './queries/post'
import followerQueries from './queries/follower'
import commentQueries from './queries/comment'
import notificationQueries from './queries/notification'

// Mutations
import postMutations from './mutations/post'
import userMutations from './mutations/user'
import uploadMutations from './mutations/upload'
import projectMutations from './mutations/project'
import commentMutations from './mutations/comment'
import notificationMutations from './mutations/notification'

const debug = require('debug')('api:resolvers')

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

const resolvers = merge(
  {},
  // queries
  scalars.resolvers,
  projectQueries,
  searchQueries,
  userQueries,
  postQueries,
  followerQueries,
  commentQueries,
  notificationQueries,
  // mutations
  postMutations,
  userMutations,
  uploadMutations,
  projectMutations,
  commentMutations,
  notificationMutations
)

// Logging
if (process.env.NODE_ENV === 'development' && debug.enabled) {
  const logExecutions = require('graphql-log')({
    logger: debug,
  })

  logExecutions(resolvers)
}

// Create the final GraphQL schema out of the type definitions
// and the resolvers
export default makeExecutableSchema({
  resolvers,
  typeDefs: [
    scalars.typeDefs,
    generalTypes,
    Root,
    Auth,
    Model,
    Comment,
    Notification,
    Post,
    Project,
    Followers,
    Search,
    User,
    File,
    Upload,
  ],
})
