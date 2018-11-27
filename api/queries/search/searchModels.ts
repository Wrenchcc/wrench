import { Like } from 'typeorm'
import paginate from 'api/utils/paginate'

export default async (args, ctx) => paginate(ctx.db.Model, args, {
  relations: ['brand'],
  where: { model: Like(`%${args.query}%`) },
})
