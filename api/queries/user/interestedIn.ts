import { requireAuth } from 'api/utils/permissions'

export default requireAuth(async ({ id }, _, ctx) => {
  try {
    const { interestedIn } = await ctx.db.User.findOne(id, {
      relations: ['interestedIn'],
    })

    return interestedIn.length > 0 ? interestedIn : null
  } catch (err) {
    console.log(err)
  }
})
