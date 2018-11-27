import paginate from 'api/utils/paginate'

export default async (_, args, ctx) => paginate(ctx.db.Posts, args)
