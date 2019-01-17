import paginate from 'api/utils/paginate'
import transformFileUrl from 'api/utils/transformFileUrl'

export default async ({ id }, args, ctx) => {
  const files = await paginate(ctx.db.File, args, {
    where: {
      postId: id,
      type: args.type,
    },
  })

  const edges = files.edges.map(({ cursor, node }) => ({
    cursor,
    node: {
      ...node,
      uri: transformFileUrl(node.filename),
    },
  }))

  return {
    ...files,
    edges,
  }
}
