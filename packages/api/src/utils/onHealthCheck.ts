import { default as DatabaseHealthCheck } from '../models/healthCheck'
import { healthCheck as ElasticSearchHealthCheck } from '../services/elasticsearch'
import { healthCheck as RedisHealthCheck } from '../services/redis'

export default async function onHealthCheck() {
  await RedisHealthCheck()
  await ElasticSearchHealthCheck()
  await DatabaseHealthCheck()
}
