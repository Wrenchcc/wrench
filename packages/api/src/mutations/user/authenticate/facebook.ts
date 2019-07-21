import { DYNAMIC_LINK_TYPES, AUTH_PROVIDER_TYPES, MAIL_TYPES } from '../../../utils/enums'
import { generateTokens } from '../../../utils/tokens'
import { dynamicLink } from '../../../services/firebase'

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

    // Delete previous tokens with same user agent and save new
    await Promise.all([
      // Upload avatar if new one
      ctx.services.facebook.uploadAvatar(authProvider.id, fbUser.id, fbUser.isSilhouette),
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

  const user = await ctx.db.User.createUser({
    email: fbUser.email,
    firstName: fbUser.firstName,
    fullName: fbUser.fullName,
    isSilhouette: fbUser.isSilhouette,
    lastName: fbUser.lastName,
  })

  const url = await dynamicLink({
    description: `See Wrench projects and posts from ${user.fullName}. (@${user.username})`,
    image: ctx.services.facebook.getAvatarById(user.id),
    path: user.username,
    title: `${user.fullName}. (@${user.username}) - projects and posts`,
  })

  await Promise.all([
    ctx.services.facebook.uploadAvatar(user.id, fbUser.id, fbUser.isSilhouette),
    ctx.db.DynamicLink.save({
      type: DYNAMIC_LINK_TYPES.USER,
      typeId: user.id,
      url,
    }),
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
