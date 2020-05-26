import { transformFileUrl } from '../../utils/transformFileUrl'

// const { CDN_DOMAIN } = process.env

const CDN_DOMAIN = 'https://cdn.wrench.cc'

export default async ({ id }, _, ctx) => {
  const file = await ctx.db.File.findOne({
    where: {
      projectId: id,
      type: 'IMAGE',
    },
    order: {
      createdAt: 'DESC',
    },
  })

  if (file) {
    return {
      default: false,
      uri: transformFileUrl(file.filename),
    }
  }

  return {
    default: true,
    uri: `${CDN_DOMAIN}/static/images/project-fallback.jpg`,
  }
}
