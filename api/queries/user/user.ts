import paginate from 'api/utils/paginate'

// TODO: Loader if slug or id
export default async (_, args, ctx) => {
  try {
    return ctx.db.User.findOne({
      where: { ...args },
    })
  } catch (err) {
    console.log(err)
  }
}
