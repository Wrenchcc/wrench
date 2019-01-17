import { isAuthenticated } from 'api/utils/permissions'

export default isAuthenticated(async (_, __, ctx) => ctx.db.User.findOne(ctx.userId))
