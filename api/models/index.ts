import { ConnectionOptions, getRepository } from 'typeorm'
import { isDevelopment } from 'api/utils/environment'
import User from './User'
import NotificationSettings from './NotificationSettings'
import AuthToken from './AuthToken'
import AuthProvider from './AuthProvider'
import ProjectType from './ProjectType'
import Project from './Project'
import Model from './Model'
import Brand from './Brand'
import Post from './Post'
import Comment from './Comment'
import Image from './Image'
import Notification from './Notification'

const { DB_PORT = 5432, DB_HOST, DB_PASSWORD, DB_USERNAME, DB_DATABASE, DB_LOGGING } = process.env

export const options: ConnectionOptions = {
  database: DB_DATABASE,
  entities: [
    AuthProvider,
    AuthToken,
    Brand,
    Comment,
    Model,
    Notification,
    NotificationSettings,
    Post,
    Project,
    ProjectType,
    User,
    Image,
  ],
  host: DB_HOST,
  logging: isDevelopment,
  password: DB_PASSWORD,
  port: Number(DB_PORT),
  synchronize: isDevelopment,
  type: 'postgres',
  username: DB_USERNAME,
}

export const db = {
  AuthProvider,
  AuthToken,
  Brand,
  Comment,
  Image,
  Model,
  Notification,
  NotificationSettings,
  Post,
  Project,
  ProjectType,
  User,
}
