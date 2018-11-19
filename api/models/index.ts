import { ConnectionOptions, getRepository } from 'typeorm'
import { isDevelopment } from 'api/utils/environment'
import User from './User'
import AuthToken from './AuthToken'
import AuthProvider from './AuthProvider'

const { DB_PORT = 5432, DB_HOST, DB_PASSWORD, DB_USERNAME, DB_DATABASE, DB_LOGGING } = process.env

export const options: ConnectionOptions = {
  database: DB_DATABASE,
  entities: [User, AuthToken, AuthProvider],
  host: DB_HOST,
  logging: isDevelopment,
  password: DB_PASSWORD,
  port: Number(DB_PORT),
  synchronize: isDevelopment,
  type: 'postgres',
  username: DB_USERNAME,
}

export const db = {
  User,
  AuthProvider,
  AuthToken,
}
