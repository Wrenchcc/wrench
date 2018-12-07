import paginate from 'api/utils/paginate'

// TODO: User dataloader
export default async (_, args, ctx) => {
  try {
    return paginate(ctx.db.Comment, args, {
      relations: ['user'],
      where: { postId: args.postId },
    })
  } catch (err) {
    console.log(err)
  }
}
