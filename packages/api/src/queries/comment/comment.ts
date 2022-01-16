export default async (_, { id }, ctx) => {
  return ctx.db.Comment.findOne(id)
}
