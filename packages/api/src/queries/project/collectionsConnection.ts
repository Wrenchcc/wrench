import paginate from '../../utils/paginate'
import { transformFileUrl, transformPosterUrl } from '../../utils/transformFileUrl'

// TODO: Use dataloader
export default async ({ id }, args, ctx) => {
  const collections = await paginate(ctx.db.ProjectCollection, args, {
    where: {
      projectId: id,
    },
  })

  const [response] = await Promise.all(
    collections.edges.map(async ({ node }) => {
      const collection = await ctx.db.PostCollection.findOne({
        collectionId: node.collectionId,
      })

      if (collection) {
        const file = await ctx.db.File.findOne({ postId: collection.postId })

        return {
          ...collections,
          edges: collections.edges.map((n) => ({
            ...n,
            node: {
              ...n.node,
              cover: {
                uri: file.poster ? transformPosterUrl(file) : file ? transformFileUrl(file) : null,
              },
            },
          })),
        }
      }
    })
  )

  // ctx.redis.set(cacheKey, response)

  return response
}
