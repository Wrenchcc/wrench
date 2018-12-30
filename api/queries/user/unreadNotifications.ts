export default async ({ id }, args, ctx) => {
  if (id === ctx.userId) {
    const [_, totalCount] = await ctx.db.Notification.findAndCount({
      where: {
        isSeen: false,
        to: id,
      },
    })

    return totalCount
  }

  return null
}
