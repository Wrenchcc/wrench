import paginate from 'api/utils/paginate'

export default async (args, ctx) => paginate(ctx.db.Post, args)
