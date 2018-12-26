import { requireAuth } from 'api/utils/permissions'
import { NOTIFICATION_TYPES } from 'api/utils/notificationTypes'

const MENTION_REGEX = /\/?\B@[a-z0-9.-]+/gi

export default requireAuth(async (_, { postId, commentId, input }, ctx) => {
  const user = await ctx.db.User.findOne(ctx.userId)
  const post = await ctx.db.Post.findOne(postId)

  // Send notification to post owner
  await ctx.services.firebase.sendPushNotification({
    data: { text: input.text },
    to: post.userId,
    type: NOTIFICATION_TYPES.NEW_COMMENT,
    userId: ctx.userId,
  })

  // Send notification to mentioned users
  const mentions = input.text.match(MENTION_REGEX)
  if (mentions) {
    const project = await ctx.db.Project.findOne(post.projectId)

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
