export default ({ userId }, args, ctx) => {
  try {
    return {
      isOwner: userId === ctx.userId,
    }
  } catch (err) {
    console.log(err)
  }
}
