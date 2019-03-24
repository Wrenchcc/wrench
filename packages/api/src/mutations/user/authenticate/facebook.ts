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
      ctx.db.AuthToken.delete({
        userId: authProvider.userId,
        userAgent,
      }),
      ctx.db.AuthToken.save({
        refreshToken: tokens.refresh_token,
        userId: authProvider.userId,
        userAgent,
      }),
    ])

    return tokens
  }

  const user = await ctx.db.User.createUser({
    firstName: fbUser.firstName,
    lastName: fbUser.lastName,
    fullName: fbUser.fullName,
    email: fbUser.email,
  })

  const url = await dynamicLink({
    description: `See Wrench projects and posts from ${user.fullName}. (@${user.username})`,
    image: ctx.services.facebook.getAvatarById(user.id),
    path: user.username,
    title: `${user.fullName}. (@${user.username}) - projects and posts`,
  })

  await Promise.all([
    ctx.services.facebook.uploadAvatar(user.id, fbUser.id),
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
      userId: user.id,
      type: MAIL_TYPES.WELCOME,
    }),
  ])

  const newTokens = generateTokens(user.id)

  // Save new refreshToken
  await ctx.db.AuthToken.save({
    refreshToken: newTokens.refresh_token,
    userId: user.id,
    userAgent,
  })

  return newTokens
}
