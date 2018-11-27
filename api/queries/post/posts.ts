import pageInfo from 'api/fixtures/pageInfo'
import posts from 'api/fixtures/posts'

export default async (_, args, ctx, info) => ({
  edges: posts(),
  pageInfo,
})
