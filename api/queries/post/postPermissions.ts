export default ({ id, userId }, args, ctx) => {
  try {
    return {
      isOwner: userId === id,
    }
  } catch (err) {
    console.log(err)
  }
}
