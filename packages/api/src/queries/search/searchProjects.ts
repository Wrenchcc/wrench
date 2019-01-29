import { Raw } from 'typeorm'
import paginate from '../../utils/paginate'

export default async (args, ctx) => paginate(ctx.db.Project, args, {
  where: {
    title: Raw(alias => `LOWER (${alias}) LIKE '%${args.query.toLowerCase()}%'`),
  },
})
