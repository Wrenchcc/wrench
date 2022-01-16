import { In } from 'typeorm'
import paginate from '../../utils/paginate'

export default async (_, args, ctx) => {
  const followers = await ctx.db.Following.find({
    where: {
      projectId: args.projectId,
    },
  })

  const ids = followers.map(({ userId }) => userId)

  const response = await paginate(ctx.db.User, args, {
    where: {
      id: ids.length ? In(ids) : null,
    },
  })

  return response
}
