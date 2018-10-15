import { withClientState } from 'apollo-link-state'
import { updatePostProgress, updatePostData } from './resolvers/post'
import schema from './schema'

const defaults = {
  postProgress: null,
  postData: null,
}

export default cache => withClientState({
  cache,
  resolvers: {
    Mutation: {
      updatePostProgress,
      updatePostData,
    },
  },
  defaults,
  typeDefs: schema,
})
