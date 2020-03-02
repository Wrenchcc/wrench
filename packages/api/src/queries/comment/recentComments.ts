import { IsNull } from 'typeorm'
import paginate from '../../utils/paginate'

// TODO: Use dataloader
export default async (_, args, ctx) =>
  paginate(ctx.db.Comment, args, {
    where: {
      commentId: IsNull(),
    },
  })
