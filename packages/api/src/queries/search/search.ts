import { ApolloError } from 'apollo-server-express'
import { SEARCH_TYPES } from '../../utils/enums'
import searchUsers from './searchUsers'
import searchProject from './searchProjects'
import searchModels from './searchModels'

export default (_, args, ctx) => {
  switch (args.type) {
    case SEARCH_TYPES.USERS:
      return searchUsers(args, ctx)
    case SEARCH_TYPES.PROJECTS:
      return searchProject(args, ctx)
    case SEARCH_TYPES.MODELS:
      return searchModels(args, ctx)
    default:
      throw new ApolloError('Invalid type supplied to Search query')
  }
}
