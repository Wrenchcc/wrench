// import { isAuthenticated } from '../../utils/permissions'
import { REPORT_TYPES } from '../../utils/enums'

export default async (_, { id, type }, ctx) => {
  let data

  switch (type) {
    case REPORT_TYPES.POST: {
      data = await ctx.db.Post.findOne(id)
    }
  }

  if (data) {
    await ctx.db.Report.save({
      typeId: data.id,
      type,
    })
  }

  return true
}
