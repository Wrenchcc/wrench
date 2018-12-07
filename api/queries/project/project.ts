// TODO: User dataloader
export default async (_, args, ctx) => {
  try {
    return ctx.db.Project.findOne({
      relations: ['user'],
      where: { ...args },
    })
  } catch (err) {
    console.log(err)
  }
}
