import paginate from 'api/utils/paginate'

export default async (_, args, ctx) => ctx.db.Users.findOne({
  where: { ...args },
})
