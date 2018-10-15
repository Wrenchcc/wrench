import { withClientState } from 'apollo-link-state'
import { updatePostProgress, updatePostData } from './resolvers/post'
import schema from './schema'

const defaults = {
  postProgress: {
    title: null,
    image: null,
    __typename: 'PostProgress',
  },
  postData: {
    caption: null,
    selectedProject: null,
    selectedIndex: null,
    dropdownOpen: false,
    __typename: 'PostData',
  },
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
