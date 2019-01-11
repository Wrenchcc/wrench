import { omit } from 'ramda'
import { generateTokens } from 'api/utils/tokens'
import { dynamicLink } from 'api/services/firebase'
import { PLATFORM_TYPES, DYNAMIC_LINK_TYPES, AUTH_PROVIDER_TYPES } from 'shared/utils/enums'

// TODO: Get platform from client
export default async (_, { facebookToken }, ctx) => {
  const fbUser = await ctx.services.facebook.getAccountData(facebookToken)

  // Find user from facebook id
  const authProvider = await ctx.db.AuthProvider.findOne({
    where: {
      type: AUTH_PROVIDER_TYPES.FACEBOOK,
      typeId: fbUser.id,
    },
  })

  if (authProvider) {
    const tokens = generateTokens(authProvider.userId)

    // Delete all previous tokens
    await Promise.all([
      ctx.db.AuthToken.delete({
        platform: PLATFORM_TYPES.MOBILE,
        userId: authProvider.userId,
      }),
      ctx.db.AuthToken.save({
        platform: PLATFORM_TYPES.MOBILE,
        refreshToken: tokens.refreshToken,
        userId: authProvider.userId,
      }),
    ])

    return tokens
  }

  // Create new user
  const createdUser = await ctx.db.User.createUser(omit(['id'], fbUser))

  const url = await dynamicLink({
    description: `See Wrench projects and posts from ${createdUser.fullName}. (@${
      createdUser.username
    })`,
    image: createdUser.avatarUrl,
    path: `user/${createdUser.username}`,
    title: `${createdUser.fullName}. (@${createdUser.username}) • Wrench projects and posts`,
  })

  await Promise.all([
    ctx.db.DynamicLink.save({
      type: DYNAMIC_LINK_TYPES.USER,
      typeId: createdUser.id,
      url,
    }),
    ctx.db.AuthProvider.save({
      type: AUTH_PROVIDER_TYPES.FACEBOOK,
      typeId: fbUser.id,
      userId: createdUser.id,
    }),
  ])

  const newTokens = generateTokens(createdUser.id)

  // Save new refreshToken
  await ctx.db.AuthToken.save({
    platform: PLATFORM_TYPES.MOBILE,
    refreshToken: newTokens.refreshToken,
    userId: createdUser.id,
  })

  return newTokens
}
