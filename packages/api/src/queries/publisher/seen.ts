import { DateTime } from 'luxon'

export default async ({ id, updatedAt }, __, ctx) => {
  const data = await ctx.db.ArticlePublisherSeen.findOne({
    where: {
      publisherId: id,
      userId: ctx.userId,
    },
  })

  if (data) {
    return DateTime.fromSQL(data.lastSeen) > DateTime.fromSQL(updatedAt)
  }

  return false
}
