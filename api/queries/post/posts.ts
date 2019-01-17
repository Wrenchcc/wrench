import paginate from 'api/utils/paginate'

export default (_, args, ctx) => paginate(ctx.db.Post, args)
