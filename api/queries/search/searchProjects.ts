import { Like } from 'typeorm'
import paginate from 'api/utils/paginate'

export default async (args, ctx) => paginate(ctx.db.Projects, args, {
  relations: ['user'],
  where: { title: Like(`%${args.query}%`) },
})
