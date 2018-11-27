export default async (_, args, ctx) => ctx.db.Project.findOne({
  relations: ['user'],
  where: { ...args },
})
