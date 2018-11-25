import mergeNotificationsTypes from 'api/utils/mergeNotificationsTypes'
import projectsConnection from 'api/fixtures/projectsConnection'
import posts from 'api/fixtures/posts'
import pageInfo from 'api/fixtures/pageInfo'
import generateUser from 'api/fixtures/generateUser'
import notificationsTypes from 'api/utils/notificationsTypes'

const postsConnection = {
  edges: posts(),
  pageInfo,
}

export default async (_, __, ctx) => {
  const user = await ctx.db.Users.findOne(ctx.userId, {
    relations: ['notificationsSettings'],
  })

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
        types: mergeNotificationsTypes(user.notificationsSettings),
      },
    },
  }
}
