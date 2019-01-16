import { isAuthenticated, canModeratePost, canModerateComment } from 'api/utils/permissions'
import { extractMentionedUsers, NOTIFICATION_TYPES } from 'shared'

export default isAuthenticated(async (_, { postId, commentId, input }, ctx) => {
  const notificationType = commentId ? NOTIFICATION_TYPES.NEW_REPLY : NOTIFICATION_TYPES.NEW_COMMENT
  const post = await ctx.db.Post.findOne(postId)
  const project = await ctx.db.Project.findOne(post.projectId)

  const comment = await ctx.db.Comment.save({
    commentId,
    postId,
    text: input.text,
    userId: ctx.userId,
  })

  // Skip "New comment" notification if post owner.
  if (!canModeratePost(post, ctx.userId)) {
    await Promise.all([
      // Add new notification to db
      ctx.db.Notification.save({
        to: post.userId,
        type: notificationType,
        typeId: comment.id,
        userId: ctx.userId,
      }),

      // Send notification to post owner
      ctx.services.firebase.send({
        data: {
          text: input.text,
          title: project.title,
        },
        sendTo: post.userId,
        type: notificationType,
        userId: ctx.userId,
      }),
    ])
  }

  // Send notification to mentioned users
  const mentions = extractMentionedUsers(input.text)

  if (mentions) {
    await Promise.all(
      mentions.map(async username => {
        const mentionedUser = await ctx.db.User.findOne({ where: { username } })

        // Skip "New Mention" notification if comment owner.
        // if (canModerateComment(comment, mentionedUser.id)) {
        //   return null
        // }

        return Promise.all([
          // Send notification to mentioned user
          ctx.services.firebase.send({
            data: {
              text: input.text,
              title: project.title,
            },
            sendTo: mentionedUser.id,
            type: NOTIFICATION_TYPES.NEW_MENTION,
            userId: ctx.userId,
          }),

          // Add new notification to db
          ctx.db.Notification.save({
            to: mentionedUser.id,
            type: NOTIFICATION_TYPES.NEW_MENTION,
            typeId: comment.id,
            userId: ctx.userId,
          }),
        ])
      })
    )
  }

  return comment
})
