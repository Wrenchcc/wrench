import paginate from '../../utils/paginate'
import { transformFileUrl } from '../../utils/transformFileUrl'

// TODO: Use dataloader
export default async ({ id }, args, ctx) => {
  // const cacheKey = `project:collectionsConnection:${id}:${JSON.stringify(args)}}`
  // const cache = await ctx.redis.get(cacheKey)

  // if (cache) {
  //   return cache
  // }

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
                uri: transformFileUrl(file),
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
