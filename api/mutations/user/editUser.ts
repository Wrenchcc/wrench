import { requireAuth } from 'api/utils/permissions'

// TODO: Use dataloader and not relations
export default requireAuth(async (_, args, ctx) => {
  const user = await ctx.db.User.findOne(ctx.userId, {
    relations: ['interestedIn'],
  })

  if (args.input.interestedIn) {
    const ids = args.input.interestedIn.map(({ id }) => id)
    const types = await ctx.db.ProjectType.findByIds(ids)

    user.interestedIn = types
  }

  return user.save()
})
