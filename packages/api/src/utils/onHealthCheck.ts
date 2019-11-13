import { default as DatabaseHealthCheck } from '../models/healthCheck'

export default async function onHealthCheck() {
  await DatabaseHealthCheck()
}
