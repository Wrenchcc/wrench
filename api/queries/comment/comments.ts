import paginate from 'api/utils/paginate'

export default async (_, args, ctx) => {
  try {
    return paginate(ctx.db.Comment, args, { where: { postId: args.id } })
  } catch (err) {
    console.log(err)
  }
}
