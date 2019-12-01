import { ApolloError } from 'apollo-server-express'
import { PROJECT_SORT_TYPES } from '../../utils/enums'
import popularProjects from './popularProjects'
import recentProjects from './recentProjects'

export default async (_, args, ctx) => {
  switch (args.type) {
    case PROJECT_SORT_TYPES.POPULAR:
      return popularProjects(args, ctx)
    case PROJECT_SORT_TYPES.RECENT:
      return recentProjects(args, ctx)
    default:
      throw new ApolloError('Invalid type supplied to Projects query')
  }
}
