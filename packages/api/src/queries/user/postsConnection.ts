import paginate from '../../utils/paginate'

// TODO: Dataloader
export default async ({ id }, args, ctx) => paginate(ctx.db.Post, args, {
  relations: ['project'],
  where: {
    userId: id,
  },
})
