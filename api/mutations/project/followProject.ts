import { requireAuth } from 'api/utils/permissions'

// TODO, can't follow own project
// Can't follow already followed project
export default requireAuth(async (_, { id }, ctx) => {
  console.log(id, ctx.userId)
  const blah = 'hej'
  console.log('hej')
})
