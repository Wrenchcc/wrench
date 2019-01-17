import { IsNull } from 'typeorm'
import paginate from 'api/utils/paginate'

// TODO: Use dataloader
export default async (_, args, ctx) => {
  try {
    return paginate(ctx.db.Comment, args, {
      where: {
        commentId: IsNull(),
        postId: args.postId,
      },
    })
  } catch (err) {
    console.log(err)
  }
}
