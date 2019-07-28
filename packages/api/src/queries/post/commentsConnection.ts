import paginate from '../../utils/paginate'

// TODO: Use dataloader
export default async ({ id }, args, ctx) =>
  paginate(ctx.db.Comment, args, {
    where: { postId: id },
  })
