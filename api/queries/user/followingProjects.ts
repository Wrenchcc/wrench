import paginate from 'api/utils/paginate'

export default async (_, args, ctx) => {
  try {
    return paginate(ctx.db.Project, args, {
      join: {
        alias: 'user',
        leftJoinAndSelect: {
          followers: 'project.followers',
        },
      },
      relations: ['user'],
    })
  } catch (err) {
    console.log(err)
  }
}
