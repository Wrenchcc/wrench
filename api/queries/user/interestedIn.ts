import { In } from 'typeorm'
import { requireAuth } from 'api/utils/permissions'

export default requireAuth(async ({ id }, _, ctx) => {
  try {
    const interestedIn = await ctx.db.UserInterestedIn.find({
      userId: ctx.userId,
    })

    const interestedInIds = interestedIn.map(({ projectTypeId }) => projectTypeId)
    const projectTypes = await ctx.db.ProjectType.find({ where: { id: In(interestedInIds) } })

    return projectTypes.length > 0 ? projectTypes : null
  } catch (err) {
    console.log(err)
  }
})
