import { ApolloError } from 'apollo-server-express'
import { PROJECT_SORT_TYPES } from '../../utils/enums'
import popularProjects from './popularProjects'
import recentProjects from './recentProjects'

export default async (_, args, ctx) => {
  switch (args.type) {
    case PROJECT_SORT_TYPES.POPULAR: {
      const cacheKey = `project:popularProjects:${JSON.stringify(args)}`
      const cache = await ctx.redis.get(cacheKey)

      if (cache) {
        return cache
      }

      const response = await popularProjects(args, ctx)
      ctx.redis.set(cacheKey, response, 604800)

      return response
    }
    case PROJECT_SORT_TYPES.RECENT: {
      const cacheKey = `project:recentProjects:${JSON.stringify(args)}`
      const cache = await ctx.redis.get(cacheKey)

      if (cache) {
        return cache
      }

      const response = await recentProjects(args, ctx)

      ctx.redis.set(cacheKey, response, 300)

      return response
    }
    default:
      throw new ApolloError('Invalid type supplied to Projects query')
  }
}
