import projectsConnection from 'api/fixtures/projectsConnection'
import settings from 'api/fixtures/settings'
import posts from 'api/fixtures/posts'
import pageInfo from 'api/fixtures/pageInfo'
import generateUser from 'api/fixtures/generateUser'

const postsConnection = {
  edges: posts(),
  pageInfo,
}

export default async (_, __, { currentUser, models }) => {
  const user = await models.user().findOne(currentUser.userId)

  return {
    ...user,
    interestedIn: [
      {
        id: '123',
      },
    ],
    postsConnection,
    projectsConnection,
    settings,
  }
}
