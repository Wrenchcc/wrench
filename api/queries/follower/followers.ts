import paginate from 'api/utils/paginate'
import { In } from 'typeorm'

// TODO: User dataloader
export default async (_, args, ctx) => {
  try {
    const followers = await ctx.db.Following.find({
      where: {
        projectId: args.projectId,
      },
    })

    const userIds = followers.map(({ userId }) => userId)

    return paginate(ctx.db.User, args, { id: In(userIds) })
  } catch (err) {
    console.log(err)
  }
}
