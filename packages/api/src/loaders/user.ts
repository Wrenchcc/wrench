import DataLoader from 'dataloader'
import User from '../models/User'

type BatchUser = (ids: string[]) => Promise<User[]>

const batchUsers: BatchUser = async ids => {
  const users = await User.findByIds(ids)

  const userMap: { [key: string]: User } = {}

  users.forEach(u => {
    userMap[u.id] = u
  })

  return ids.map(id => userMap[id])
}

export const createUserLoader = () => new DataLoader<string, User>(batchUsers)
