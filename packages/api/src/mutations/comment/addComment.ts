import { ForbiddenError } from 'apollo-server-express'
import { trim } from 'ramda'
import { isAuthenticated, canModeratePost, canModerateComment } from '../../utils/permissions'
import { NOTIFICATION_TYPES } from '../../utils/enums'
import { extractMentionedUsers } from '../../utils/regex'

const debug = require('debug')('api:mutations:comment:add-comment')

const SPAM_LMIT = 10

export default isAuthenticated(async (_, { postId, commentId, input }, ctx) => {
  const userPreviousPublishedPosts = await ctx.db.Comment.usersreviousPublished('5 minutes')

  // if user has published comments in the last 5 minutes, check for spam
  if (userPreviousPublishedPosts.count > 0) {
    debug('User has commented at least once in the previous 5m - running spam checks')

    if (userPreviousPublishedPosts.count >= SPAM_LMIT) {
      debug('User has commented at least 10 times in the previous 5m')

      return new ForbiddenError(
        'You’ve been commenting a lot! Please wait a few minutes before posting more.'
      )
    }
  }

  const notificationType = commentId ? NOTIFICATION_TYPES.NEW_REPLY : NOTIFICATION_TYPES.NEW_COMMENT
  const post = await ctx.db.Post.findOne(postId)
  const project = await ctx.db.Project.findOne(post.projectId)
  const text = input.text && trim(input.text)

  const comment = await ctx.db.Comment.save({
    commentId,
    postId,
    text,
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
          commentId: comment.id,
          postId: post.id,
          text,
          title: project.title,
        },
        to: post.userId,
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
        if (canModerateComment(comment, mentionedUser.id)) {
          return null
        }

        return Promise.all([
          // Send notification to mentioned user
          ctx.services.firebase.send({
            data: {
              commentId: comment.id,
              text,
              title: project.title,
              postId: post.id,
            },
            to: mentionedUser.id,
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
