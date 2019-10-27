import { ConnectionOptions } from 'typeorm'
import Article from './Article'
import ArticleAuthor from './ArticleAuthor'
import ArticleCategory from './ArticleCategory'
import ArticleCategoryRelationships from './ArticleCategoryRelationships'
import ArticleFile from './ArticleFile'
import ArticlePublisher from './ArticlePublisher'
import ArticlePublisherSeen from './ArticlePublisherSeen'
import AuthProvider from './AuthProvider'
import AuthToken from './AuthToken'
import Brand from './Brand'
import Comment from './Comment'
import DeviceToken from './DeviceToken'
import File from './File'
import Following from './Following'
import Like from './Like'
import Model from './Model'
import Notification from './Notification'
import Post from './Post'
import Project from './Project'
import ProjectType from './ProjectType'
import User from './User'
import UserInterestedIn from './UserInterestedIn'
import UserSettings from './UserSettings'

const {
  DB_PORT = 5432,
  DB_HOST,
  DB_PASSWORD,
  DB_USERNAME,
  DB_DATABASE,
  DB_LOGGING,
  DB_SYNCHRONIZE,
} = process.env

export const options: ConnectionOptions = {
  database: DB_DATABASE,
  entities: [
    Article,
    ArticleAuthor,
    ArticleCategory,
    ArticleCategoryRelationships,
    ArticleFile,
    ArticlePublisher,
    ArticlePublisherSeen,
    AuthProvider,
    AuthToken,
    Brand,
    Comment,
    DeviceToken,
    File,
    Following,
    Like,
    Model,
    Notification,
    Post,
    Project,
    ProjectType,
    User,
    UserInterestedIn,
    UserSettings,
  ],
  host: DB_HOST,
  logging: Boolean(DB_LOGGING),
  password: DB_PASSWORD,
  port: Number(DB_PORT),
  synchronize: Boolean(DB_SYNCHRONIZE),
  type: 'postgres',
  username: DB_USERNAME,
}

export const db = {
  Article,
  ArticleAuthor,
  ArticleCategory,
  ArticleCategoryRelationships,
  ArticleFile,
  ArticlePublisher,
  ArticlePublisherSeen,
  AuthProvider,
  AuthToken,
  Brand,
  Comment,
  DeviceToken,
  File,
  Following,
  Like,
  Model,
  Notification,
  Post,
  Project,
  ProjectType,
  User,
  UserInterestedIn,
  UserSettings,
}
