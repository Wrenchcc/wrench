import { In } from 'typeorm'
import paginate from '../../utils/paginate'

export default async (_, args, ctx) => {
  let collections

  if (args.id) {
    collections = await paginate(ctx.db.PostCollection, args, {
      where: {
        collectionId: args.id,
        projectId: args.projectId,
      },
    })
  }

  if (args.projectSlug && args.slug) {
    const [project, collection] = await Promise.all([
      ctx.db.Project.findOne({ slug: args.projectSlug }),
      ctx.db.Collection.findOne({ slug: args.slug }),
    ])

    collections = await paginate(ctx.db.PostCollection, args, {
      where: {
        collectionId: collection.id,
        projectId: project.id,
      },
    })
  }

  const ids = collections.edges.map(({ node }) => node.postId)

  const posts = await ctx.db.Post.find({
    where: {
      id: ids.length ? In(ids) : null,
    },
  })

  return {
    totalCount: collections.totalCount,
    pageInfo: collections.pageInfo,
    edges: collections.edges.map((b) => {
      return {
        cursor: b.cursor,
        node: posts.find((p) => p.id === b.node.postId),
      }
    }),
  }
}
