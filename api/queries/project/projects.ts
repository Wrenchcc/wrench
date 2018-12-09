import paginate from 'api/utils/paginate'

// TODO: User dataloader
export default async (_, args, ctx) => {
  try {
    return paginate(ctx.db.Project, args)
  } catch (err) {
    console.log(err)
  }
}
