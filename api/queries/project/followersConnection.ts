import paginate from 'api/utils/paginate'

export default async ({ id }, args, ctx) => {
  try {
    return paginate(ctx.db.User, args, {
      join: {
        alias: 'following',
        leftJoinAndSelect: {
          following: 'user.following',
        },
      },
      relations: ['projects'],
    })
  } catch (err) {
    console.log(err)
  }
}
