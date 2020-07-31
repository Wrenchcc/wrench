import { Between } from 'typeorm'
import { DateTime } from 'luxon'

export default async (_, __, ctx) => {
  const start = DateTime.local()
    .setZone('Europe/Stockholm')
    .startOf('day')
    .toFormat('yyyy-MM-dd HH:mm:ss z')
  const end = DateTime.local()
    .setZone('Europe/Stockholm')
    .endOf('day')
    .toFormat('yyyy-MM-dd HH:mm:ss z')

  const [, totalCount] = await ctx.db.Post.findAndCount({
    createdAt: Between(start, end),
  })

  return totalCount
}
