import paginate from 'api/utils/paginate'

export default async (_, args, ctx) => {
  try {
    return paginate(ctx.db.Projects, args)
  } catch (err) {
    console.log(err)
  }
}
