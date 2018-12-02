import { Like } from 'typeorm'
import paginate from 'api/utils/paginate'

// TODO: LOWER
export default async (args, ctx) => {
  try {
    return paginate(ctx.db.User, args, {
      where: { fullName: Like(`%${args.query}%`) },
    })
  } catch (err) {
    console.log(err)
  }
}
