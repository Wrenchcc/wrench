// TODO: Use dataloader
export default async (_, { id }, ctx) => {
  // Check for id when used in project
  if (!id) {
    return null
  }

  return ctx.db.Post.findOne(id)
}
