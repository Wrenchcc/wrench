import { filter } from 'ramda'
import { DateTime } from 'luxon'
import { NOTIFICATION_TYPES } from '../../utils/enums'
import { isAuthenticated } from '../../utils/permissions'
import convertPageInfo from '../../utils/paginate/convertPageInfo'
import findOperators from '../../utils/paginate/findOperators'
import { encodeCursor } from '../../utils/paginate/cursor'

export default isAuthenticated(async (_, { after, before, last = 10, first = 10 }, ctx) => {
  // Set user last seen for isOnline (clients are polling every 1m)
  await ctx.db.User.update(ctx.userId, {
    lastSeen: DateTime.local().toFormat('yyyy-MM-dd HH:mm:ss+00'),
  })

  const { unreadCount } = await ctx.db.Notification.unreadCount(ctx.userId)

  const [notifications, totalCount] = await ctx.db.Notification.findAndCount({
    order: {
      createdAt: 'DESC',
    },
    take: first,
    where: {
      to: ctx.userId,
      ...findOperators(
        { after, before },
        {
          column: 'createdAt',
          sort: 'DESC',
        }
      ),
    },
  })

  const edges = await Promise.all(
    notifications.map(async ({ typeId, type, userId, id, createdAt, ...rest }) => {
      const user = await ctx.loaders.user.load(userId)
      const cursor = encodeCursor(id, createdAt)

      switch (type) {
        case NOTIFICATION_TYPES.NEW_POST_LIKE:
          const post = await ctx.db.Post.findOne(typeId)

          if (!post) {
            await ctx.db.Notification.delete({ typeId })
            return null
          }

          return {
            cursor,
            node: {
              ...rest,
              createdAt,
              id,
              post,
              type,
              user,
            },
          }
        case NOTIFICATION_TYPES.NEW_FOLLOWER:
          const project = await ctx.loaders.project.load(typeId)

          if (!project) {
            await ctx.db.Notification.delete({ typeId })
            return null
          }

          return {
            cursor,
            node: {
              ...rest,
              createdAt,
              id,
              project,
              type,
              user,
            },
          }
        case NOTIFICATION_TYPES.NEW_MENTION:
        case NOTIFICATION_TYPES.NEW_COMMENT:
        case NOTIFICATION_TYPES.NEW_COMMENT_LIKE:
        case NOTIFICATION_TYPES.NEW_REPLY:
          const comment = await ctx.loaders.comment.load(typeId)

          if (!comment) {
            await ctx.db.Notification.delete({ typeId })
            return null
          }

          return {
            cursor,
            node: {
              ...rest,
              comment,
              createdAt,
              id,
              type,
              user,
            },
          }
        default:
          return null
      }
    })
  )

  const pageInfo = convertPageInfo(totalCount, first, last)

  return {
    edges: filter((n) => n !== null, edges),
    pageInfo,
    unreadCount,
  }
})
