import { Raw } from 'typeorm'
import paginate from 'api/utils/paginate'

export default async (args, ctx) => {
  try {
    return paginate(ctx.db.User, args, {
      where: {
        fullName: Raw(alias => `LOWER (${alias}) LIKE '%${args.query.toLowerCase()}%'`),
      },
    })
  } catch (err) {
    console.log(err)
  }
}
