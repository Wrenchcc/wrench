import { transformFileUrl } from '../../utils/transformFileUrl'

const { CDN_DOMAIN } = process.env

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
    return transformFileUrl(file.filename)
  }

  return `${CDN_DOMAIN}/static/images/project-fallback.jpg`
}
