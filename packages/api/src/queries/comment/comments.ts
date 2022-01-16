import { IsNull } from 'typeorm'
import paginate from '../../utils/paginate'

export default async (_, args, ctx) => {
  const response = await paginate(ctx.db.Comment, args, {
    where: {
      commentId: IsNull(),
      postId: args.postId,
    },
  })

  return response
}
