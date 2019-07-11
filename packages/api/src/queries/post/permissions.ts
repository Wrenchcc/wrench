export default ({ userId }, _, ctx) => ({
  isOwner: userId === ctx.userId,
})
