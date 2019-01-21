export default async (_, args, ctx) => {
  if (args.username) return ctx.loaders.userByUsername.load(args.username)
  if (args.id) return ctx.loaders.user.load(args.id)
}
