import { ConnectionOptions, getRepository } from 'typeorm'

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
import File from './File'
import Notification from './Notification'
import Following from './Following'
import DeviceToken from './DeviceToken'

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
    Model,
    Notification,
    NotificationSettings,
    Post,
    Project,
    ProjectType,
    User,
    File,
    Following,
    DeviceToken,
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
  Model,
  Notification,
  NotificationSettings,
  Post,
  Project,
  ProjectType,
  User,
}
