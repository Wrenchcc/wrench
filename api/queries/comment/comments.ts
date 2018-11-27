import comments from 'api/fixtures/comments'
import pageInfo from 'api/fixtures/pageInfo'

export default () => ({
  edges: comments(),
  pageInfo,
})
