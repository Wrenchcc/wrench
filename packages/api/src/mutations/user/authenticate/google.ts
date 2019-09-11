import { AUTH_PROVIDER_TYPES, MAIL_TYPES } from '../../../utils/enums'
import { generateTokens } from '../../../utils/tokens'

const GOOGLE_EMAIL_DOMAIN = 'cloudtestlabaccounts.com'

export default async (_, { idToken, code }, ctx) => {
  const googleUser = await ctx.services.google.userInfo(idToken, code)
  const { userAgent } = ctx

  if (googleUser.email.includes(GOOGLE_EMAIL_DOMAIN)) {
    return null
  }

  const authProvider = await ctx.db.AuthProvider.findOne({
    where: {
      type: AUTH_PROVIDER_TYPES.GOOGLE,
      typeId: googleUser.id,
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
  if (googleUser.email) {
    const emailUser = await ctx.db.User.findOne({
      where: {
        email: googleUser.email,
      },
    })

    if (emailUser) {
      const tokens = generateTokens(emailUser.id)

      await Promise.all([
        // Delete previous tokens with same user agent and save new
        ctx.db.AuthToken.delete({
          userAgent,
          userId: emailUser.userId,
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
    email: googleUser.email,
    firstName: googleUser.firstName,
    fullName: googleUser.fullName,
    isSilhouette: googleUser.isSilhouette,
    lastName: googleUser.lastName,
  })

  await Promise.all([
    ctx.services.google.uploadAvatar(user.id, googleUser.avatarUrl, googleUser.isSilhouette),
    ctx.db.AuthProvider.save({
      type: AUTH_PROVIDER_TYPES.GOOGLE,
      typeId: googleUser.id,
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
