import UserError from 'api/utils/UserError'
import searchUsers from './searchUsers'
import searchProject from './searchProjects'
import searchModels from './searchModels'

export default (_, args, ctx) => {
  switch (args.type) {
    case 'USERS':
      return searchUsers(args, ctx)
    case 'PROJECTS':
      return searchProject(args, ctx)
    case 'MODELS': {
      return searchModels(args, ctx)
    }
    default:
      throw new UserError('Invalid searchType supplied to Search query')
  }
}
