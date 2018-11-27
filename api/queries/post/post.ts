export default async (_, { id }, ctx) => ctx.db.Post.findOne(id)
