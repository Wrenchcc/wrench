import { requireAuth } from 'api/utils/permissions'
import pageInfo from 'api/fixtures/pageInfo'
import posts from 'api/fixtures/posts'

// If has userId fetch based on that else use context userId
export default requireAuth(async (_, args, ctx) => ({
  edges: posts(),
  pageInfo,
}))
