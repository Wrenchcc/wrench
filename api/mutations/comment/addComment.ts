import { requireAuth } from 'api/utils/permissions'
import { NOTIFICATION_TYPES } from 'shared/utils/enums'
import { MENTION_REGEX } from 'shared/utils/regex'

export default requireAuth(async (_, { postId, commentId, input }, ctx) => {
  const post = await ctx.db.Post.findOne(postId)
  const project = await ctx.db.Project.findOne(post.projectId)
  const notificationType = commentId ? NOTIFICATION_TYPES.NEW_REPLY : NOTIFICATION_TYPES.NEW_COMMENT

  const comment = await ctx.db.Comment.save({
    commentId,
    postId,
    text: input.text,
    userId: ctx.userId,
  })

  // Add new notification to db
  await Promise.all([
    ctx.db.Notification.save({
      to: post.userId,
      type: notificationType,
      typeId: comment.id,
      userId: ctx.userId,
    }),

    // Send notification to post owner
    ctx.services.firebase.sendPushNotification({
      data: {
        text: input.text,
        title: project.title,
      },
      to: post.userId,
      type: NOTIFICATION_TYPES.NEW_COMMENT,
      userId: ctx.userId,
    }),
  ])

  // Send notification to mentioned users
  const mentions = input.text.match(MENTION_REGEX)
  if (mentions) {
    await Promise.all(
      mentions.map(async mention => {
        const username = mention.replace('@', '')
        const mentionedUser = await ctx.db.User.findOne({ where: { username } })

        return Promise.all([
          ctx.services.firebase.sendPushNotification({
            data: {
              text: input.text,
              title: project.title,
            },
            to: mentionedUser.id,
            type: notificationType,
            userId: ctx.userId,
          }),

          // Add new notification to db
          ctx.db.Notification.save({
            to: mentionedUser.id,
            type: notificationType,
            typeId: comment.id,
            userId: ctx.userId,
          }),
        ])
      })
    )
  }

  return comment
})
