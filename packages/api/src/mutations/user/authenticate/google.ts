import { AUTH_PROVIDER_TYPES, MAIL_TYPES } from '../../../utils/enums'
// import { getAvatarById, getDefaultAvatar } from '../../../utils/avatar'
import { generateTokens } from '../../../utils/tokens'
// import { dynamicLink } from '../../../services/firebase'

export default async (_, { idToken, code }, ctx) => {
  const googleUser = await ctx.services.google.verifyIdToken(idToken, code)
  const { userAgent } = ctx

  const isSilhouette = true

  // if(googleUser.aud)

  return null

  // Find user from google id (sub)
  const authProvider = await ctx.db.AuthProvider.findOne({
    where: {
      type: AUTH_PROVIDER_TYPES.GOOGLE,
      typeId: googleUser.sub,
    },
  })

  if (authProvider) {
    const tokens = generateTokens(authProvider.userId)

    await Promise.all([
      // Upload avatar if new one
      // ctx.services.facebook.uploadAvatar(authProvider.id, googleUser.sub, isSilhouette),
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

  const user = await ctx.db.User.createUser({
    email: googleUser.email,
    firstName: googleUser.given_name,
    fullName: googleUser.name,
    isSilhouette,
    lastName: googleUser.family_name,
  })

  // const url = await dynamicLink({
  //   description: `See Wrench projects and posts from ${user.fullName}. (@${user.username})`,
  //   image: isSilhouette ? getDefaultAvatar() : getAvatarById(user.id),
  //   path: user.username,
  //   title: `${user.fullName}. (@${user.username}) - projects and posts`,
  // })

  await Promise.all([
    // ctx.services.facebook.uploadAvatar(user.id, googleUser.sub, isSilhouette),
    // ctx.db.DynamicLink.save({
    //   type: DYNAMIC_LINK_TYPES.USER,
    //   typeId: user.id,
    //   url,
    // }),
    ctx.db.AuthProvider.save({
      type: AUTH_PROVIDER_TYPES.FACEBOOK,
      typeId: googleUser.sub,
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
