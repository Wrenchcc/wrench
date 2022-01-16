export default async (_, args, ctx) => {
  const response = await ctx.db.Hashtag.findOne({
    where: {
      ...args,
    },
  })

  return response
}
