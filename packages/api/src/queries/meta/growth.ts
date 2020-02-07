import { Between } from 'typeorm'
import { DateTime } from 'luxon'

export default async (
  _,
  {
    type,
    startDate = DateTime.local()
      .minus({ month: 4 })
      .startOf('day')
      .toFormat('yyyy-MM-dd HH:mm:ss+00'),
    endDate = DateTime.local()
      .startOf('day')
      .toFormat('yyyy-MM-dd HH:mm:ss+00'),
  },
  ctx
) => {
  let data

  const args = {
    createdAt: Between(startDate, endDate),
  }

  if (type === 'PROJECTS') {
    data = await ctx.db.Project.find(args)
  }

  if (type === 'USERS') {
    data = await ctx.db.User.find(args)
  }

  const ids = data.map(({ createdAt }) => {
    const date = DateTime.fromSQL(createdAt)
      .startOf('day')
      .toFormat('yyyy-MM-dd HH:mm:ss+00')

    return {
      id: DateTime.fromSQL(createdAt).toFormat('yyyy-MM'),
      date,
    }
  })

  const result = ids.reduce((prev, cur) => {
    prev[cur.id] = (prev[cur.id] || 0) + 1
    return prev
  }, {})

  return Object.entries(result).map(([key, value]) => ({
    count: value,
    date: new Date(key),
  }))
}
