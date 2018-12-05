import paginate from 'api/utils/paginate'

// TODO: Dataloader
export default async ({ id }, args, ctx) => {
  try {
    return paginate(ctx.db.Post, args, {
      relations: ['project'],
      where: {
        userId: id,
      },
    })
  } catch (err) {
    console.log(err)
  }
}
