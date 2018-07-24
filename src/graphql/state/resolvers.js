export default {
  Mutation: {
    addAuthenticatedUser: (_, { data }, { cache }) => {
      cache.writeData({
        data: {
          currentUser: {
            ...data,
            __typename: 'Auth',
          },
        },
      })

      return null
    },
  },
}
