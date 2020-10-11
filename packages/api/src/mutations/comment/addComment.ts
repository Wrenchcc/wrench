import { ApolloError } from 'apollo-server-express'
import { trim } from 'ramda'
import { isAuthenticated, canModeratePost, canModerateComment } from '../../utils/permissions'
import { NOTIFICATION_TYPES, ERROR_CODES } from '../../utils/enums'
import { extractMentionedUsers } from '../../utils/regex'

const debug = require('debug')('api:mutations:comment:add-comment')

const SPAM_LMIT = 10

export default isAuthenticated(async (_, { postId, commentId, input }, ctx) => {
  const userPreviousPublishedPosts = await ctx.db.Comment.userPreviousPublished(
    '5 minutes',
    ctx.userId
  )

  // if user has published comments in the last 5 minutes, check for spam
  if (userPreviousPublishedPosts.count > 0) {
    debug('User has commented at least once in the previous 5m - running spam checks')

    if (userPreviousPublishedPosts.count >= SPAM_LMIT) {
      debug('User has commented at least 10 times in the previous 5m')

      return new ApolloError(
        'You’ve been commenting a lot! Please wait a few minutes before posting more.',
        ERROR_CODES.SPAM
      )
    }
  }

  await Promise.all([
    ctx.redis.delete(`comment:commentsConnection:${postId}:*`),
    ctx.redis.delete(`comment:comments:${postId}:*`),
    ctx.redis.delete(`comment:repliesConnection:${commentId}:*`),
    ctx.redis.delete(`post:commentsConnection:${postId}:*`),
  ])

  const notificationType = commentId ? NOTIFICATION_TYPES.NEW_REPLY : NOTIFICATION_TYPES.NEW_COMMENT
  const post = await ctx.db.Post.findOne(postId)
  const project = await ctx.db.Project.findOne(post.projectId)
  const text = input.text && trim(input.text)

  const comment = await ctx.db.Comment.save({
    commentId,
    postId: post.id,
    text,
    userId: ctx.userId,
  })

  const comments = await ctx.db.Comment.find({
    postId: post.id,
  })

  comments.map((comment) => {
    // NOTE: Do not send to comment owner, post owner or current user
    if (
      !canModerateComment(comment, comment.userId) &&
      !canModeratePost(post, comment.userId) &&
      comment.userId !== ctx.userId
    ) {
      // ctx.services.firebase.send({
      //   data: {
      //     commentId: comment.id,
      //     postId: post.id,
      //     owner: 'Viktor',
      //     text,
      //   },
      //   to: comment.userId,
      //   type: NOTIFICATION_TYPES.COMMENT_UPDATES,
      //   userId: ctx.userId,
      // })
    }
  })

  // NOTE: If ctx user is not the owner of the post
  // Add new comment to the post owner from the ctx user
  if (!canModeratePost(post, ctx.userId)) {
    debug('Save notification to: %o ', post.userId)
    debug('Send push notification to: %o ', post.userId)

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
        },
        to: post.userId,
        type: notificationType,
        userId: ctx.userId,
      }),
    ])
  }

  // NOTE: Send notification to mentioned users
  const mentions = extractMentionedUsers(input.text)

  if (mentions) {
    await Promise.all(
      mentions.map(async (username) => {
        const mentionedUser = await ctx.db.User.findOne({ where: { username } })

        // NOTE: Skip "New Mention" notification if comment owner.
        // And if mentioned user is the post owner, just add "NEW_COMMENT" to notifications.
        if (
          !mentionedUser ||
          canModerateComment(comment, mentionedUser.id) ||
          mentionedUser.id === post.userId
        ) {
          return
        }

        debug('Save notification to: %o ', mentionedUser.id)
        debug('Send push notification to: %o ', mentionedUser.id)

        return Promise.all([
          // NOTE: Send mention to mentioned user
          ctx.services.firebase.send({
            data: {
              commentId: comment.id,
              postId: post.id,
              text,
              title: project.title,
            },
            to: mentionedUser.id,
            type: NOTIFICATION_TYPES.NEW_MENTION,
            userId: ctx.userId,
          }),

          // NOTE: Add new mention to db
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
