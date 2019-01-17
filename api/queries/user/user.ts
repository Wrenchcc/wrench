import paginate from 'api/utils/paginate'

// TODO: Loader if slug or id
export default async (_, args, ctx) => ctx.db.User.findOne({
  where: { ...args },
})
