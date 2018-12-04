import paginate from 'api/utils/paginate'

export default async ({ id }, args, ctx) => {
  try {
    return paginate(
      ctx.db.Following,
      args,
      {
        relations: ['user'],
        where: {
          projectId: id,
        },
      },
      'user'
    )
  } catch (err) {
    console.log(err)
  }
}
