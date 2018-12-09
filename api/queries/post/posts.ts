import paginate from 'api/utils/paginate'

export default async (_, args, ctx) => {
  try {
    return paginate(ctx.db.Post, args)
  } catch (err) {
    console.log(err)
  }
}
