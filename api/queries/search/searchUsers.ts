import { Like } from 'typeorm'
import paginate from 'api/utils/paginate'

export default async (args, ctx) => paginate(ctx.db.User, args, {
  where: { fullName: Like(`%${args.query}%`) },
})
