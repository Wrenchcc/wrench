import { ConnectionOptions, getRepository } from 'typeorm'
import { isDevelopment } from 'api/utils/environment'
import Users from './Users'
import NotificationsSettings from './NotificationsSettings'
import AuthTokens from './AuthTokens'
import AuthProviders from './AuthProviders'
import ProjectTypes from './ProjectTypes'
import Projects from './Projects'
import Models from './Models'
import Brands from './Brands'
import Posts from './Posts'

const { DB_PORT = 5432, DB_HOST, DB_PASSWORD, DB_USERNAME, DB_DATABASE, DB_LOGGING } = process.env

export const options: ConnectionOptions = {
  database: DB_DATABASE,
  entities: [
    Brands,
    Users,
    NotificationsSettings,
    AuthTokens,
    AuthProviders,
    ProjectTypes,
    Projects,
    Models,
    Posts,
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
  AuthProviders,
  AuthTokens,
  Brands,
  NotificationsSettings,
  Projects,
  ProjectTypes,
  Users,
  Models,
  Posts,
}
