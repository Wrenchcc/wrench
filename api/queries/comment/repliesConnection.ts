import paginate from 'api/utils/paginate'

// TODO: Use dataloader
export default async ({ id }, args, ctx) => {
  try {
    return paginate(ctx.db.Comment, args, {
      where: { commentId: id },
    })
  } catch (err) {
    console.log(err)
  }
}
