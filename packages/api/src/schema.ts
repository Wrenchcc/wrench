import gql from 'graphql-tag'
import { makeExecutableSchema } from 'apollo-server-express'
import merge from 'lodash.merge'
import scalars from './types/scalars'
import generalTypes from './types/general'

// Types
import Auth from './types/Auth'
import Bookmark from './types/Bookmark'
import Collection from './types/Collection'
import Comment from './types/Comment'
import Feed from './types/Feed'
import File from './types/File'
import Followers from './types/Followers'
import Hashtag from './types/Hashtag'
import Invite from './types/Invite'
import Like from './types/Like'
import Meta from './types/Meta'
import Model from './types/Model'
import Notification from './types/Notification'
import Post from './types/Post'
import Project from './types/Project'
import Report from './types/Report'
import Search from './types/Search'
import Upload from './types/Upload'
import User from './types/User'

// Queries
import collectionQueries from './queries/collection'
import bookmarkQueries from './queries/bookmark'
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
import likesQueries from './queries/like'
import fileQueries from './queries/file'

// Mutations
import bookmarkMutations from './mutations/bookmark'
import collectionMutations from './mutations/collection'
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

  directive @cacheControl(maxAge: Int, scope: CacheControlScope) on OBJECT | FIELD_DEFINITION

  enum CacheControlScope {
    PUBLIC
    PRIVATE
  }

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
  collectionQueries,
  bookmarkQueries,
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
  fileQueries,
  // mutations
  collectionMutations,
  bookmarkMutations,
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
    Auth,
    Bookmark,
    Comment,
    Collection,
    Feed,
    File,
    Followers,
    generalTypes,
    Hashtag,
    Invite,
    Like,
    Like,
    Meta,
    Model,
    Notification,
    Post,
    Project,
    Report,
    Root,
    Search,
    Upload,
    User,
  ],
})
