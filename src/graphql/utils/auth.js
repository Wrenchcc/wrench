import { setItem, getItem, removeItem } from 'utils/storage'
import { client } from 'graphql/createClient'

const STORAGE_KEY = 'current_user'

export const saveUser = data => setItem(STORAGE_KEY, data)

export const getUser = () => getItem(STORAGE_KEY)

export const resetStore = () => {
  client.resetStore()
  removeItem(STORAGE_KEY)
}
