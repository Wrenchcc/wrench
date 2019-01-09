import { resetIndex } from './utils/mapping'

const debug = require('debug')('api:elasticsearch')

export default async () => {
  await resetIndex()
}
