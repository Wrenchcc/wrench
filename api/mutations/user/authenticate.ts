import { omit } from 'ramda'
import { generateTokens } from 'api/utils/tokens'
import { createDynamicLink } from 'api/services/firebase'
import { PLATFORM_TYPES, DYNAMIC_LINK_TYPES } from 'shared/utils/enums'

const PROVIDER_NAME = 'facebook'

// TODO: Get platform from client
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
      platform: PLATFORM_TYPES.MOBILE,
      userId: authProvider.userId,
    })

    // Save new token with user
    await ctx.db.AuthToken.save({
      platform: PLATFORM_TYPES.MOBILE,
      refreshToken: tokens.refreshToken,
      user,
    })

    return tokens
  }

  // Create new user
  const createdUser = await ctx.db.User.createUser(omit(['id'], fbUser))

  const dynamicLink = await createDynamicLink({
    description: `See Wrench projects and posts from ${createdUser.fullName}. (@${
      createdUser.username
    })`,
    image: createdUser.avatarUrl,
    path: `user/${createdUser.username}`,
    title: `${createdUser.fullName}. (@${createdUser.username}) • Wrench projects and posts`,
  })

  await ctx.db.DynamicLink.save({
    type: DYNAMIC_LINK_TYPES.USER,
    typeId: createdUser.id,
    url: dynamicLink,
  })

  // Save provider using facebook
  await ctx.db.AuthProvider.save({
    providerId: fbUser.id,
    providerName: PROVIDER_NAME,
    user: createdUser,
  })

  const newTokens = generateTokens(createdUser.id)

  // Save new refreshToken
  await ctx.db.AuthToken.save({
    platform: PLATFORM_TYPES.MOBILE,
    refreshToken: newTokens.refreshToken,
    user: createdUser,
  })

  return newTokens
}
