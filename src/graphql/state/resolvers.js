export default {
  Mutation: {
    addLoggedInUser: (_, { data }, { cache }) => {
      cache.writeData({
        data: {
          loggedInUser: {
            __typename: 'User',
            ...data,
          },
        },
      })

      return null
    },
  },
}
