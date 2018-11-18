import projectsConnection from 'api/fixtures/projectsConnection'
import settings from 'api/fixtures/settings'
import posts from 'api/fixtures/posts'
import pageInfo from 'api/fixtures/pageInfo'
import generateUser from 'api/fixtures/generateUser'

const postsConnection = {
  edges: posts(),
  pageInfo,
}

export default async (_, { currentUser }, { models, services }) => ({
  ...generateUser(),
  interestedIn: [
    {
      id: '123',
    },
  ],
  postsConnection,
  projectsConnection,
  settings,
})
