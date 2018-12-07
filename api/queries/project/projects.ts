import paginate from 'api/utils/paginate'

// TODO: User dataloader
export default async (_, args, ctx) => {
  try {
    return paginate(ctx.db.Project, args, {
      relations: ['user'],
    })
  } catch (err) {
    console.log(err)
  }
}
