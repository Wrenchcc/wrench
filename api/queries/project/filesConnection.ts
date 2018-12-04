import paginate from 'api/utils/paginate'

const { APP_CDN_DOMAIN } = process.env

// TODO: Transform uri
export default async ({ id }, args, ctx) => {
  try {
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
        uri: `${APP_CDN_DOMAIN}/${node.filename}`,
      },
    }))

    return {
      ...files,
      edges,
    }
  } catch (err) {
    console.log(err)
  }
}
