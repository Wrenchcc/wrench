import { createConnection, Connection, ConnectionOptions } from 'typeorm'
import Article from './Article'
import ArticleAuthor from './ArticleAuthor'
import ArticleCategory from './ArticleCategory'
import ArticleCategoryRelationships from './ArticleCategoryRelationships'
import ArticleFile from './ArticleFile'
import ArticlePublisher from './ArticlePublisher'

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
  ],
  host: DB_HOST,
  logging: Boolean(DB_LOGGING),
  password: DB_PASSWORD,
  port: Number(DB_PORT),
  synchronize: Boolean(DB_SYNCHRONIZE),
  type: 'postgres',
  username: DB_USERNAME,
}

export async function connection() {
  return createConnection(options)
}

export const db = {
  Article,
  ArticleAuthor,
  ArticleCategory,
  ArticleCategoryRelationships,
  ArticleFile,
  ArticlePublisher,
}
