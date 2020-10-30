import paginate from '../../utils/paginate'
import { transformFileUrl } from '../../utils/transformFileUrl'

// TODO: Use dataloader
export default async (_, args, ctx) => {
  let collections

  if (args.projectId) {
    collections = await paginate(ctx.db.ProjectCollection, args, {
      where: {
        projectId: args.projectId,
      },
    })
  }

  if (args.projectSlug) {
    const project = await ctx.db.Project.findOne({
      slug: args.projectSlug,
    })

    collections = await paginate(ctx.db.ProjectCollection, args, {
      where: {
        projectId: project.id,
      },
    })
  }

  const edges = await Promise.all(
    collections.edges.map(async (n) => {
      const collection = await ctx.db.Collection.findOne(n.node.collectionId)
      const pCollection = await ctx.db.PostCollection.findOne({
        projectId: n.node.projectId,
        collectionId: n.node.collectionId,
      })
      const file = pCollection?.postId
        ? await ctx.db.File.findOne({ postId: pCollection.postId })
        : null

      return {
        ...n,
        node: {
          ...collection,
          cover: {
            uri: file ? transformFileUrl(file.filename) : null,
          },
        },
      }
    })
  )

  return {
    ...collections,
    edges,
  }
}
