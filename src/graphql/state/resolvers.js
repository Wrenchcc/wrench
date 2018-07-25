export default {
  Mutation: {
    addLoggedInUser: (_, { data }, { cache }) => {
      cache.writeData({
        data: {
          loggedInUser: {
            __typename: 'Auth',
            ...data,
          },
        },
      })

      return null
    },
  },
}
