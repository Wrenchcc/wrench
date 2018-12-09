import { requireAuth } from 'api/utils/permissions'

export default requireAuth(({ id, userId }, args, ctx) => {
  try {
    return {
      isOwner: userId === ctx.userId,
    }
  } catch (err) {
    console.log(err)
  }
})
