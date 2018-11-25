import { ConnectionOptions, getRepository } from 'typeorm'
import { isDevelopment } from 'api/utils/environment'
import Users from './Users'
import NotificationsSettings from './NotificationsSettings'
import AuthTokens from './AuthTokens'
import AuthProviders from './AuthProviders'

const { DB_PORT = 5432, DB_HOST, DB_PASSWORD, DB_USERNAME, DB_DATABASE, DB_LOGGING } = process.env

export const options: ConnectionOptions = {
  database: DB_DATABASE,
  entities: [Users, NotificationsSettings, AuthTokens, AuthProviders],
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
  NotificationsSettings,
  Users,
}
