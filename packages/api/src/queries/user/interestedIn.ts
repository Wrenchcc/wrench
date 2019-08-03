import { In } from 'typeorm'

export default async ({ id }, _, ctx) => {
  const interestedIn = await ctx.db.UserInterestedIn.find({
    userId: id,
  })

  const ids = interestedIn.map(({ projectTypeId }) => projectTypeId)

  const projectTypes = await ctx.db.ProjectType.find({
    where: {
      id: ids.length ? In(ids) : null,
    },
  })

  return projectTypes.length > 0 ? projectTypes : null
}
