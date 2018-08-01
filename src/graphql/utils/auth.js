import { setItem, getItem, removeItem } from 'utils/storage'

const STORAGE_KEY = 'user'

export const saveUser = data => setItem(STORAGE_KEY, data)

export const getUser = () => getItem(STORAGE_KEY)

export const resetStore = () => {
  removeItem(STORAGE_KEY)
}
