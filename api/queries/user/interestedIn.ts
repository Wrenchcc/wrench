import { requireAuth } from 'api/utils/permissions'

// TODO: Dataloader
export default requireAuth(async ({ id }, _, ctx) => {
  try {
    const interestedIn = await ctx.db.UserInterestedIn.find({
      userId: ctx.userId,
    })

    return interestedIn.length > 0 ? interestedIn : null
  } catch (err) {
    console.log(err)
  }
})
