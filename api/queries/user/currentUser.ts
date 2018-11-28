import { isAuthenticated } from 'api/utils/permissions'

export default isAuthenticated(async (_, __, ctx) => {
  try {
    return ctx.db.Users.findOne(ctx.userId)
  } catch (err) {
    console.log(err)
  }
})
