export default async ({ id }, _, ctx) => {
  const { interestedIn } = await ctx.db.Users.findOne(id, {
    relations: ['interestedIn'],
  })

  return interestedIn
}
