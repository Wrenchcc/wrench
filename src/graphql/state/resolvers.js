import { setItem, getItem } from 'utils/storage'

const STORAGE_KEY = 'current_user'

export default {
  currentUser: () => console.log('here'),
  User: () => console.log('here'),
  Mutation: {
    addLoggedInUser: async (_, { data }) => {
      console.log(data)
      await setItem(STORAGE_KEY, data)
      // const user = await getItem(STORAGE_KEY)
      //
      // cache.writeData({
      //   data: {
      //     loggedInUser: {
      //       __typename: 'User',
      //       ...data,
      //     },
      //   },
      // })

      return null
    },
  },
  Query: {
    User: () => console.log('here'),
    getCurrentUser: () => console.log('here'),
  },
}
