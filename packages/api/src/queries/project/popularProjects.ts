import { In } from 'typeorm'
import paginate from '../../utils/paginate'

// TODO: Use dataloader
// TODO: Not really sort by id should follow the IDs structure
export default async (args, ctx) => {
  const projects = await ctx.db.Project.getPopularProjects()
  const ids = projects.map(({ id }) => id)

  return paginate(
    ctx.db.Project,
    args,
    {
      where: {
        id: ids.length ? In(ids) : null,
      },
    },
    {
      column: 'id',
      sort: 'DESC',
    }
  )
}
