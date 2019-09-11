import { AUTH_PROVIDER_TYPES, MAIL_TYPES } from '../../../utils/enums'
import { generateTokens } from '../../../utils/tokens'

export default async (_, { token }, ctx) => {
  const fbUser = await ctx.services.facebook.userInfo(token)
  const { userAgent } = ctx

  // Find user from facebook id
  const authProvider = await ctx.db.AuthProvider.findOne({
    where: {
      type: AUTH_PROVIDER_TYPES.FACEBOOK,
      typeId: fbUser.id,
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
  if (fbUser.email) {
    const emailUser = await ctx.db.User.findOne({
      where: {
        email: fbUser.email,
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
    email: fbUser.email,
    firstName: fbUser.firstName,
    fullName: fbUser.fullName,
    isSilhouette: fbUser.isSilhouette,
    lastName: fbUser.lastName,
  })

  await Promise.all([
    ctx.services.facebook.uploadAvatar(user.id, fbUser.id, fbUser.isSilhouette),
    ctx.db.AuthProvider.save({
      type: AUTH_PROVIDER_TYPES.FACEBOOK,
      typeId: fbUser.id,
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
