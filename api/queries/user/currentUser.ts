import { isAuthenticated } from 'api/utils/permissions'

export default isAuthenticated(async (_, __, ctx) => {
  try {
    return ctx.db.User.findOne(ctx.userId)
  } catch (err) {
    console.log(err)
  }
})
