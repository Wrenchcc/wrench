import { IsNull } from 'typeorm'
import paginate from '../../utils/paginate'

export default async (_, args, ctx) =>
  paginate(ctx.db.Comment, args, {
    where: {
      commentId: IsNull(),
    },
  })
