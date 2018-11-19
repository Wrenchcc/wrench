import { pluck } from 'ramda'
import { generateTokens } from 'api/utils/tokens'

const PROVIDER_NAME = 'facebook'

export default async (_, { facebookToken }, ctx) => {
  const { id: providerId, ...fbUser } = await ctx.services.facebook.getAccountData(facebookToken)
  const authProvider = await ctx.db.AuthProvider.findOne({
    where: { providerId, providerName: PROVIDER_NAME },
    relations: ['user'],
  })

  if (authProvider) {
    const tokens = generateTokens(authProvider.user.id)

    await ctx.db.AuthToken.save({
      refreshToken: tokens.refreshToken,
      user: authProvider.user,
    })

    return tokens
  }

  const createdUser = await ctx.db.User.save(fbUser)

  await ctx.db.AuthProvider.save({
    providerName: PROVIDER_NAME,
    providerId,
    user: createdUser,
  })

  const tokens = generateTokens(createdUser.id)

  await ctx.db.AuthToken.save({
    refreshToken: tokens.refreshToken,
    user: createdUser,
  })

  return tokens
}
