import { withClientState } from 'apollo-link-state'

const typeDefs = `
  type PostProgress {
    title: String!
    image: String!
  }
`

export default cache => withClientState({
  cache,
  resolvers: {
    Mutation: {
      updatePostProgress: (_, { data }, { cache }) => {
        cache.writeData({
          data: {
            postProgress: {
              __typename: 'PostProgress',
              ...data,
            },
          },
        })
        return null
      },
    },
  },
  defaults: {
    postProgress: {
      __typename: 'PostProgress',
      title: null,
      image: null,
    },
  },
  typeDefs,
})
