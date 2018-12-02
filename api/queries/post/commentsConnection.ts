import paginate from 'api/utils/paginate'

export default async ({ id }, args, ctx) => {
  try {
    return paginate(ctx.db.Comment, args, { where: { postId: id } })
  } catch (err) {
    console.log(err)
  }
}
