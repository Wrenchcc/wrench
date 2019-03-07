import { omit } from 'ramda'
import { DYNAMIC_LINK_TYPES, AUTH_PROVIDER_TYPES, MAIL_TYPES } from '../../utils/enums'
import { generateTokens } from '../../utils/tokens'
import { dynamicLink } from '../../services/firebase'

export default async (_, { facebookToken, platform }, ctx) => {
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

    // Delete all previous tokens and save new
    await Promise.all([
      ctx.db.AuthToken.delete({
        platform,
        userId: authProvider.userId,
      }),
      ctx.db.AuthToken.save({
        platform,
        refreshToken: tokens.refresh_token,
        userId: authProvider.userId,
      }),
    ])

    return tokens
  }

  // Create new user
  // avatarUrl = http://graph.facebook.com/${fbUser.id}/picture?type=square&width=200&height=200
  const createdUser = await ctx.db.User.createUser(omit(['id'], fbUser))

  const url = await dynamicLink({
    description: `See Wrench projects and posts from ${createdUser.fullName}. (@${
      createdUser.username
    })`,
    image: createdUser.avatarUrl,
    path: createdUser.username,
    title: `${createdUser.fullName}. (@${createdUser.username}) - projects and posts`,
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
    ctx.services.mail.send({
      userId: createdUser.userId,
      type: MAIL_TYPES.WELCOME,
    }),
  ])

  const newTokens = generateTokens(createdUser.id)

  // Save new refreshToken
  await ctx.db.AuthToken.save({
    platform,
    refreshToken: newTokens.refresh_token,
    userId: createdUser.id,
  })

  return newTokens
}
