import { In } from 'typeorm'
import paginate from '../../utils/paginate'

export default async (_, args, ctx) => {
  const posts = await ctx.db.PostCollection.find({
    collectionId: args.id,
    projectId: args.projectId,
  })

  const ids = posts.map(({ postId }) => postId)

  return paginate(ctx.db.Post, args, {
    where: {
      id: ids.length ? In(ids) : null,
    },
  })
}
