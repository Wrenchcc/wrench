import { isAuthenticated } from '../../utils/permissions'

export default isAuthenticated(async (_, __, ctx) => ctx.db.User.findOne(ctx.userId))
