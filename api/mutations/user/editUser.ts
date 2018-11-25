export default async (_, args, ctx) => {
  const user = await ctx.db.Users.findOne(ctx.userId, {
    relations: ['interestedIn'],
  })

  if (args.input.interestedIn) {
    const ids = args.input.interestedIn.map(({ id }) => id)
    const types = await ctx.db.ProjectTypes.findByIds(ids)

    user.interestedIn = types
  }

  return user.save()
}
