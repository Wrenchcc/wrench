import { saveUser } from 'graphql/utils/auth'

export default {
  Mutation: {
    addCurrentUser: async (_, { data }, { cache }) => {
      await saveUser(data)

      cache.writeData({
        data: {
          currentUser: {
            __typename: 'User',
            ...data,
          },
        },
      })

      return null
    },
  },
}
