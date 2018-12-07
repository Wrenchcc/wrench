import paginate from 'api/utils/paginate'

// TODO: User dataloader
export default async ({ id }, args, ctx) => {
  try {
    return paginate(ctx.db.Comment, args, {
      relations: ['user'],
      where: { postId: id },
    })
  } catch (err) {
    console.log(err)
  }
}
