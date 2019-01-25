import { ApolloError } from 'apollo-server-express'
// import { PROJECT_SORT_TYPES } from '@wrench/shared'
import popularProjects from './popularProjects'

export default async (_, args, ctx) => {
  switch (args.type) {
    case 'PROJECT_SORT_TYPES.POPULAR':
      return popularProjects(args, ctx)
    default:
      throw new ApolloError('Invalid ProjectSortType supplied to Projects query')
  }
}
