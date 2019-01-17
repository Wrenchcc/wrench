import { ApolloError } from 'apollo-server-express'
import { In } from 'typeorm'
import { PROJECT_SORT_TYPES } from 'shared'
import paginate from 'api/utils/paginate'

// TODO: Use dataloader
export default async (_, args, ctx) => {
  switch (args.type) {
    case PROJECT_SORT_TYPES.POPULAR:
      const projects = await ctx.db.Project.getPopularProjects()
      const ids = projects.map(({ id }) => id)

      return paginate(ctx.db.Project, args, {
        where: { id: ids.length ? In(ids) : null },
      })
    default:
      throw new ApolloError('Invalid ProjectSortType supplied to Projects query')
  }
}
