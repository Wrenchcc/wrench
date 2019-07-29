import gql from 'graphql-tag'
import { makeExecutableSchema } from 'apollo-server-express'
import * as merge from 'lodash.merge'
import scalars from './types/scalars'
import generalTypes from './types/general'

// Types
import Article from './types/Article'
import Auth from './types/Auth'
import Comment from './types/Comment'
import Feed from './types/Feed'
import File from './types/File'
import Followers from './types/Followers'
import Invite from './types/Invite'
import Like from './types/Like'
import Model from './types/Model'
import Notification from './types/Notification'
import Post from './types/Post'
import Project from './types/Project'
import Publisher from './types/Publisher'
import Search from './types/Search'
import Upload from './types/Upload'
import User from './types/User'

// Queries
import articleQueries from './queries/article'
import commentQueries from './queries/comment'
import feedQueries from './queries/feed'
import followerQueries from './queries/follower'
import notificationQueries from './queries/notification'
import postQueries from './queries/post'
import projectQueries from './queries/project'
import searchQueries from './queries/search'
import userQueries from './queries/user'
import publisherQueries from './queries/publisher'

// Mutations
import commentMutations from './mutations/comment'
import inviteMutations from './mutations/invite'
import notificationMutations from './mutations/notification'
import postMutations from './mutations/post'
import projectMutations from './mutations/project'
import uploadMutations from './mutations/upload'
import userMutations from './mutations/user'
import likeMutations from './mutations/like'

const debug = require('debug')('api:resolvers')

const Root = gql`
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
  articleQueries,
  commentQueries,
  feedQueries,
  followerQueries,
  notificationQueries,
  postQueries,
  projectQueries,
  publisherQueries,
  searchQueries,
  userQueries,
  // mutations
  commentMutations,
  inviteMutations,
  notificationMutations,
  postMutations,
  projectMutations,
  uploadMutations,
  userMutations,
  likeMutations
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
    Article,
    Auth,
    Comment,
    Feed,
    File,
    Followers,
    Invite,
    Like,
    Model,
    Notification,
    Post,
    Project,
    Publisher,
    Root,
    Search,
    Upload,
    User,
  ],
})
