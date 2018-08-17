import { setItem, getItem, removeItem } from 'utils/storage'
import { getCurrentUserQuery } from '../queries/getCurrentUser'

const STORAGE_KEY = '@wrench:user'

export const setAuthenticadedUser = data => setItem(STORAGE_KEY, data)
export const getAuthenticadedUser = () => getItem(STORAGE_KEY)
export const removeAuthenticadedUser = () => removeItem(STORAGE_KEY)

export const rehydrateAuthenticadedUser = async client => {
  const data = await getAuthenticadedUser()
  if (!data) return

  client.writeQuery({
    query: getCurrentUserQuery,
    data: {
      currentUser: {
        ...data.user,
      },
    },
  })
}
