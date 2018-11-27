export default async (_, args, ctx) => ctx.db.Projects.findOne({
  relations: ['user'],
  where: { ...args },
})
