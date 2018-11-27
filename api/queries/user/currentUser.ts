export default async (_, __, ctx) => ctx.db.Users.findOne(ctx.userId)
