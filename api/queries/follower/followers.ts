import pageInfo from 'api/fixtures/pageInfo'
import users from 'api/fixtures/users'

const followersConnection = {
  edges: users(),
  pageInfo,
  totalCount: 4000,
}

export default () => followersConnection
