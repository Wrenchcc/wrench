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
  let result = []

  console.log(type)

  const data = await ctx.db.Comment.find({
    createdAt: Between(startDate, endDate),
  })

  data.map(({ createdAt }) => {
    const date = DateTime.fromSQL(createdAt)
      .startOf('day')
      .toFormat('yyyy-MM-dd HH:mm:ss+00')
    const id = DateTime.fromSQL(createdAt).toFormat('yyyyMM')
    const index = result.findIndex(item => item.id === id)
    console.log(index)
    if (index > 0) {
      const item = result[index]
      result[index] = { ...item, count: item?.count + 1 }
    } else {
      result.push({ id, count: 1, date })
    }
  })

  return result
}
