import gql from 'graphql-tag'
import { makeExecutableSchema } from 'apollo-server-express'
import merge from 'lodash.merge'
import scalars from './types/scalars'
import generalTypes from './types/general'

// Types
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
import Search from './types/Search'
import Upload from './types/Upload'
import User from './types/User'
import Meta from './types/Meta'
import Hashtag from './types/Hashtag'
import Report from './types/Report'

// Queries
import commentQueries from './queries/comment'
import feedQueries from './queries/feed'
import followerQueries from './queries/follower'
import notificationQueries from './queries/notification'
import postQueries from './queries/post'
import projectQueries from './queries/project'
import searchQueries from './queries/search'
import userQueries from './queries/user'
import metaQueries from './queries/meta'
import hashtagQueries from './queries/hashtag'
import likesQueries from './queries/likes'

// Mutations
import commentMutations from './mutations/comment'
import inviteMutations from './mutations/invite'
import notificationMutations from './mutations/notification'
import postMutations from './mutations/post'
import projectMutations from './mutations/project'
import uploadMutations from './mutations/upload'
import userMutations from './mutations/user'
import likeMutations from './mutations/like'
import reportMutations from './mutations/report'

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
  commentQueries,
  feedQueries,
  followerQueries,
  notificationQueries,
  postQueries,
  projectQueries,
  searchQueries,
  userQueries,
  hashtagQueries,
  likesQueries,
  // mutations
  commentMutations,
  inviteMutations,
  notificationMutations,
  postMutations,
  projectMutations,
  uploadMutations,
  userMutations,
  likeMutations,
  metaQueries,
  reportMutations
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
    Auth,
    Comment,
    Feed,
    File,
    Followers,
    Like,
    Invite,
    Like,
    Model,
    Notification,
    Post,
    Project,
    Root,
    Search,
    Upload,
    User,
    Meta,
    Hashtag,
    Report,
  ],
})
