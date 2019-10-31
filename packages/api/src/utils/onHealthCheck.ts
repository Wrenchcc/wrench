import { default as DBHealthCheck } from '../models/healthCheck'
import { healthCheck as ESHealthCheck } from '../services/elasticsearch'
// import { healthCheck as RedisHealthCheck } from '../services/redis'

export default async function onHealthCheck() {
  return Promise.all([ESHealthCheck, DBHealthCheck])
}
