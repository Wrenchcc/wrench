import paginate from '../../utils/paginate'
import { transformFileUrl } from '../../utils/transformFileUrl'
import { isAdmin } from '../../utils/permissions'

// TODO: Use dataloader
export default async ({ id }, args, ctx) => {
  const files = await paginate(ctx.db.File, args, {
    where: {
      projectId: id,
      type: args.type,
    },
  })

  const edges = files.edges.map(({ cursor, node }) => ({
    cursor,
    node: {
      ...node,
      uri: transformFileUrl(node.filename, isAdmin(ctx.userId)),
    },
  }))

  return {
    ...files,
    edges,
  }
}
