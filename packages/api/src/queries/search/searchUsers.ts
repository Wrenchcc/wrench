import { Raw } from 'typeorm'
import paginate from '../../utils/paginate'

export default async (args, ctx) => paginate(ctx.db.User, args, {
  where: {
    fullName: Raw(alias => `LOWER (${alias}) LIKE '%${args.query.toLowerCase()}%'`),
  },
})
