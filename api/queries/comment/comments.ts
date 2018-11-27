import paginate from 'api/utils/paginate'

export default async (_, args, ctx) => paginate(ctx.db.Comment, args, { where: { postId: args.id } })
