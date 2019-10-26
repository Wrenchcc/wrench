import { getConnection } from 'typeorm'
import promiseTimeout from './promiseTimeout'

const TIMEOUT = 1000

export default async function onHealthCheck() {
  const connection = getConnection()
  const check = await connection.query('SELECT 1')
  return promiseTimeout(TIMEOUT, check)
}
