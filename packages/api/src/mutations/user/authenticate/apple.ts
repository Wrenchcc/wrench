import { AUTH_PROVIDER_TYPES, MAIL_TYPES } from '../../../utils/enums'
import { generateTokens } from '../../../utils/tokens'

export default async (_, { identityToken, user: { firstName, lastName } }, ctx) => {
  const appleUser = await ctx.services.apple.userInfo(identityToken)
  const { userAgent } = ctx

  // Find user from apple id
  const authProvider = await ctx.db.AuthProvider.findOne({
    where: {
      type: AUTH_PROVIDER_TYPES.APPLE,
      typeId: appleUser.id,
    },
  })

  if (authProvider) {
    const tokens = generateTokens(authProvider.userId)
    await Promise.all([
      // Delete previous tokens with same user agent and save new
      ctx.db.AuthToken.delete({
        userAgent,
        userId: authProvider.userId,
      }),
      ctx.db.AuthToken.save({
        refreshToken: tokens.refresh_token,
        userAgent,
        userId: authProvider.userId,
      }),
    ])
    return tokens
  }

  // Find user by email
  if (appleUser.email) {
    const emailUser = await ctx.db.User.findOne({
      where: {
        email: appleUser.email,
      },
    })

    if (emailUser) {
      const tokens = generateTokens(emailUser.userId)
      await Promise.all([
        // Delete previous tokens with same user agent and save new
        ctx.db.AuthToken.delete({
          userAgent,
          userId: emailUser.id,
        }),
        ctx.db.AuthProvider.save({
          type: AUTH_PROVIDER_TYPES.APPLE,
          typeId: appleUser.id,
          userId: emailUser.id,
        }),
        ctx.db.AuthToken.save({
          refreshToken: tokens.refresh_token,
          userAgent,
          userId: emailUser.id,
        }),
      ])
      return tokens
    }
  }

  const user = await ctx.db.User.createUser({
    email: appleUser.email,
    firstName,
    fullName: `${firstName} ${lastName}`,
    isSilhouette: true,
    lastName,
  })

  await Promise.all([
    ctx.db.AuthProvider.save({
      type: AUTH_PROVIDER_TYPES.APPLE,
      typeId: appleUser.id,
      userId: user.id,
    }),
    ctx.services.mail.send({
      type: MAIL_TYPES.WELCOME,
      userId: user.id,
    }),
  ])

  const newTokens = generateTokens(user.id)

  // Save new refreshToken
  await ctx.db.AuthToken.save({
    refreshToken: newTokens.refresh_token,
    userAgent,
    userId: user.id,
  })

  return newTokens
}
