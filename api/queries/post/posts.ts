import { ApolloError } from 'apollo-server-express'
import { isAuthenticated } from 'api/utils/permissions'
import { POST_SORT_TYPES } from 'shared'
import feed from './feed'
import recent from './recent'

export default isAuthenticated((_, args, ctx) => {
  switch (args.type) {
    case POST_SORT_TYPES.RECENT:
      return recent(args, ctx)
    case POST_SORT_TYPES.FEED:
      return feed(args, ctx)
    default:
      throw new ApolloError('Invalid postStortType supplied to Post query')
  }
})
