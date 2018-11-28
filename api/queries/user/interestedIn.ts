export default async ({ id }, _, ctx) => {
  try {
    const { interestedIn } = await ctx.db.Users.findOne(id, {
      relations: ['interestedIn'],
    })

    return interestedIn
  } catch (err) {
    console.log(err)
  }
}
