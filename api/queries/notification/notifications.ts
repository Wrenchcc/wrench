import notifications from 'api/fixtures/notifications'
import pageInfo from 'api/fixtures/pageInfo'

export default () => ({
  edges: notifications(),
  pageInfo,
})
