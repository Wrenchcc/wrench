import { transformFileUrl } from '../../utils/transformFileUrl'
import { isAdmin } from '../../utils/permissions'

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
    return {
      default: false,
      uri: transformFileUrl(file.filename, isAdmin(ctx.userId)),
    }
  }

  return {
    default: true,
    uri: `${CDN_DOMAIN}/static/images/project-fallback.jpg`,
  }
}
