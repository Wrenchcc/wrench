import paginate from 'api/utils/paginate'

export default async (_, args, ctx) => {
  try {
    return ctx.db.Users.findOne({
      where: { ...args },
    })
  } catch (err) {
    console.log(err)
  }
}
