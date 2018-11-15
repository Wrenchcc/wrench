import { getRepository } from 'typeorm'
import User from './User'

export default {
  User: () => getRepository(User),
}
