export default async (_, { id }, ctx) => {
  try {
    return ctx.db.Post.findOne(id)
  } catch (err) {
    console.log(err)
  }
}
