import { isAuthenticated } from '../../utils/permissions'

export default isAuthenticated(async (_, { id, original }, ctx) => {
  // NOTE: If the post is already translated to users language
  const originalPost = await ctx.db.Post.findOne(id)

  if (original) {
    return originalPost
  }

  const setting = await ctx.db.UserSettings.findOne({ userId: ctx.userId, type: 'locale' })
  const translatedPost = await ctx.db.PostTranslation.findOne({
    postId: id,
    language: setting?.value,
  })

  if (translatedPost) {
    return {
      ...originalPost,
      caption: translatedPost.caption,
    }
  }

  const translation = await ctx.services.translate.translateText(
    originalPost.caption,
    setting?.value
  )

  await ctx.db.PostTranslation.save({
    postId: originalPost.id,
    caption: translation,
    language: setting?.value,
  })

  return {
    ...originalPost,
    caption: translation,
  }
})
