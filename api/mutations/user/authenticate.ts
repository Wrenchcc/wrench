import { omit } from 'ramda'
import { generateTokens } from 'api/utils/tokens'

const PROVIDER_NAME = 'facebook'
const PLATFORMS = {
  MOBILE: 'mobile',
  WEB: 'web',
}

export default async (_, { facebookToken }, ctx) => {
  const fbUser = await ctx.services.facebook.getAccountData(facebookToken)

  // Find user from facebook id
  const authProvider = await ctx.db.AuthProvider.findOne({
    where: {
      providerId: fbUser.id,
      providerName: PROVIDER_NAME,
    },
  })

  if (authProvider) {
    const tokens = generateTokens(authProvider.userId)
    const user = await ctx.db.User.findOne(authProvider.userId)

    // Delete all previous tokens
    await ctx.db.AuthToken.delete({
      platform: PLATFORMS.MOBILE,
      userId: authProvider.userId,
    })

    // Save new token with user
    await ctx.db.AuthToken.save({
      platform: PLATFORMS.MOBILE,
      refreshToken: tokens.refreshToken,
      user,
    })

    return tokens
  }

  // Create new user and generate slug and dynamicLink
  const createdUser = await ctx.db.User.createUser(omit(['id'], fbUser))

  // Save provider using facebook
  await ctx.db.AuthProvider.save({
    providerId: fbUser.id,
    providerName: PROVIDER_NAME,
    user: createdUser,
  })

  const newTokens = generateTokens(createdUser.id)

  // Save new refreshToken
  await ctx.db.AuthToken.save({
    platform: PLATFORMS.MOBILE,
    refreshToken: newTokens.refreshToken,
    user: createdUser,
  })

  return newTokens
}
