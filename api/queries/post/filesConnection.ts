import paginate from 'api/utils/paginate'

export default async ({ id }, args, ctx) => {
  try {
    return paginate(ctx.db.File, args, {
      where: {
        postId: id,
        type: args.type,
      },
    })
  } catch (err) {
    console.log(err)
  }
}
