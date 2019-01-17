export default ({ userId }, args, ctx) => ({
  isOwner: userId === ctx.userId,
})
