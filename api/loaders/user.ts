import * as DataLoader from 'dataloader'
import User from '../models/User'

export const createUserLoader = () => new DataLoader(async (keys: string[]) => {
  const users = await User.findByIds(keys)

  const userMap: { [key: string]: User } = {}

  users.forEach(u => {
    userMap[u.id] = u
  })

  return keys.map(k => userMap[k])
})
