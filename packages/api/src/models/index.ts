import { ConnectionOptions } from 'typeorm'
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
import Hashtag from './Hashtag'
import Report from './Report'

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
    Hashtag,
    Report,
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
  Hashtag,
  Report,
}
