import { saveUser, getUser } from 'graphql/utils/auth'

export default {
  Mutation: {
    addCurrentUser: async (_, { data }, { cache }) => {
      await saveUser(data)

      cache.writeData({
        data: {
          getCurrentUser: {
            __typename: 'User',
            ...data,
          },
        },
      })

      return null
    },
  },
  Query: {
    getCurrentUser: async () => {
      const user = await getUser()

      return {
        __typename: 'User',
        ...user,
      }
    },
  },
}
