// TODO: Use dataloader
export default async (_, { id }, ctx) => ctx.db.Comment.findOne(id)
