import { Between } from 'typeorm'
import { DateTime } from 'luxon'

export default async (_, __, ctx) => {
  const start = DateTime.local()
    .startOf('day')
    .toFormat('yyyy-MM-dd HH:mm:ss+00')
  const end = DateTime.local()
    .endOf('day')
    .toFormat('yyyy-MM-dd HH:mm:ss+00')

  const [, totalCount] = await ctx.db.Post.findAndCount({
    createdAt: Between(start, end),
  })

  return totalCount
}
