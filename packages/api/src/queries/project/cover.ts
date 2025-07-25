import { transformFileUrl, transformPosterUrl } from '../../utils/transformFileUrl'

const { CDN_DOMAIN } = process.env

export default async ({ id }, _, ctx) => {
  const cacheKey = `project:cover:${id}`
  const cache = await ctx.redis.get(cacheKey)

  if (cache) {
    return cache
  }

  const file = await ctx.db.File.findOne({
    where: {
      projectId: id,
    },
    order: {
      createdAt: 'DESC',
    },
  })

  if (file) {
    return {
      default: false,
      uri: file?.poster ? transformPosterUrl(file) : transformFileUrl(file),
    }
  }

  const response = {
    default: true,
    uri: `${CDN_DOMAIN}/static/images/project-fallback.jpg`,
  }

  ctx.redis.set(cacheKey, response)

  return response
}
