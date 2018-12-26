import { requireAuth } from 'api/utils/permissions'
import { NOTIFICATION_TYPES } from 'api/utils/notificationTypes'
import { MENTION_REGEX } from 'shared/utils/regex'

export default requireAuth(async (_, { postId, commentId, input }, ctx) => {
  const user = await ctx.db.User.findOne(ctx.userId)
  const post = await ctx.db.Post.findOne(postId)
  const project = await ctx.db.Project.findOne(post.projectId)

  // Send notification to post owner
  await ctx.services.firebase.sendPushNotification({
    data: {
      text: input.text,
      title: project.title,
    },
    to: post.userId,
    type: NOTIFICATION_TYPES.NEW_COMMENT,
    userId: ctx.userId,
  })

  // Send notification to mentioned users
  const mentions = input.text.match(MENTION_REGEX)
  if (mentions) {
    mentions.map(async mention => {
      const username = mention.replace('@', '')
      const mentionedUser = await ctx.db.User.findOne({ where: { username } })

      await ctx.services.firebase.sendPushNotification({
        data: {
          title: project.title,
        },
        to: mentionedUser.id,
        type: NOTIFICATION_TYPES.NEW_MENTION,
        userId: ctx.userId,
      })
    })
  }

  return ctx.db.Comment.save({
    commentId,
    postId,
    text: input.text,
    user,
  })
})
