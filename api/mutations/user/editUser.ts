import { requireAuth } from 'api/utils/permissions'

// TODO: Use dataloader
export default requireAuth(async (_, args, ctx) => {
  if (args.input.interestedIn) {
    const interestedIn = args.input.interestedIn.map(({ id }) => ({
      projectTypeId: id,
      userId: ctx.userId,
    }))

    await ctx.db.UserInterestedIn.save(interestedIn)
  }

  return ctx.db.User.findOne(ctx.userId)
})
