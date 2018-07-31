import { setItem, getItem } from 'utils/storage'

const STORAGE_KEY = 'current_user'

export default {
  Mutation: {
    addCurrentUser: async (_, { data }) => {
      await setItem(STORAGE_KEY, data)

      return null
    },
  },
  Query: {
    getCurrentUser: async () => {
      const user = await getItem(STORAGE_KEY)
      console.log(user)
      return {
        __typename: 'User',
        ...user,
      }
    },
  },
}
