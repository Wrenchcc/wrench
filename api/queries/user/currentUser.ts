import { mergeDeepRight } from 'ramda'
import projectsConnection from 'api/fixtures/projectsConnection'
import posts from 'api/fixtures/posts'
import pageInfo from 'api/fixtures/pageInfo'
import generateUser from 'api/fixtures/generateUser'
import defaultNotificationTypes from 'api/utils/defaultNotificationTypes'
import { transformNotificationTypes } from 'api/utils/transformNotificationTypes'

const postsConnection = {
  edges: posts(),
  pageInfo,
}

export default async (_, __, ctx) => {
  const user = await ctx.db.Users.findOne(ctx.userId)

  const parent = await ctx.db.Settings.findOne({
    select: ['id'],
    where: {
      type: 'notifications',
      userId: user.id,
    },
  })

  const notifications = await ctx.db.Settings.find({
    select: ['type', 'value'],
    where: {
      parentId: parent.id,
      userId: ctx.userId,
    },
  })

  const types = mergeDeepRight(defaultNotificationTypes, transformNotificationTypes(notifications))

  return {
    ...user,
    interestedIn: [
      {
        id: '123',
      },
    ],
    postsConnection,
    projectsConnection,
    settings: {
      notifications: {
        types,
      },
    },
  }
}
