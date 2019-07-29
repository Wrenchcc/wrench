import paginate from '../../utils/paginate'

// TODO: Use dataloader
export default async ({ id }, args, ctx) =>
  paginate(ctx.db.Post, args, {
    where: {
      projectId: id,
    },
  })
