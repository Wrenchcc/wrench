import { isAuthenticated } from '../../utils/permissions'

export default isAuthenticated(async (_, { id, original }, ctx) => {
  // NOTE: If the post is already translated to users language
  const originalComment = await ctx.db.Comment.findOne(id)

  if (original) {
    return originalComment
  }

  const setting = await ctx.db.UserSettings.findOne({ userId: ctx.userId, type: 'locale' })
  const translatedComment = await ctx.db.CommentTranslation.findOne({
    commentId: id,
    language: setting?.value,
  })

  if (translatedComment) {
    return {
      ...originalComment,
      text: translatedComment.text,
    }
  }

  const translation = await ctx.services.translate.translateText(
    originalComment.text,
    setting?.value
  )

  await ctx.db.CommentTranslation.save({
    commentId: originalComment.id,
    text: translation,
    language: setting?.value,
  })

  return {
    ...originalComment,
    text: translation,
  }
})
