import pageInfo from 'api/fixtures/pageInfo'
import posts from 'api/fixtures/posts'

export default (root, args, ctx, info) => ({
  edges: posts(),
  pageInfo,
})
