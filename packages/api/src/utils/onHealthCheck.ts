import { default as DatabaseHealthCheck } from '../models/healthCheck'
// import { healthCheck as ElasticSearchHealthCheck } from '../services/elasticsearch'

export default async function onHealthCheck() {
  // await ElasticSearchHealthCheck()
  await DatabaseHealthCheck()
}
