// TODO: userByUsername loader
export default async (_, args, ctx) => {
  if (args.username) {
    return ctx.db.User.findOne({
      where: {
        username: args.username,
      },
    })
  }
  if (args.id) {
    return ctx.loaders.user.load(args.id)
  }
}
