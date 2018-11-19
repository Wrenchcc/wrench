import { pluck } from 'ramda'
import { generateTokens } from 'api/utils/tokens'

export default async (_, { facebookToken }, ctx) => {
  const { id, ...fbUser } = await ctx.services.facebook.getAccountData(facebookToken)
  const user = await ctx.db.User.findOne({ facebookId: id })

  if (user) {
    return {
      tokens: generateTokens(user.id),
    }
  }

  const createdUser = await ctx.db.User.save({ ...fbUser, facebookId: id })
  const tokens = generateTokens(createdUser.id)

  // TODO: Save tokens
  // await ctx.db.User.update(createdUser.id, { refreshToken }, relation:['tokens'])

  return {
    tokens,
  }
}
