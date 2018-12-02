import paginate from 'api/utils/paginate'

export default async ({ id }, args, ctx) => {
  try {
    return paginate(ctx.db.Post, args, {
      relations: ['project'],
      where: { projectId: id },
    })
  } catch (err) {
    console.log(err)
  }
}
