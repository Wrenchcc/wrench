// TODO: User dataloader
export default async (_, { id }, ctx) => {
  try {
    return ctx.db.Post.findOne(id, { relations: ['project'] })
  } catch (err) {
    console.log(err)
  }
}
