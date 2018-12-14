import { Raw } from 'typeorm'
import paginate from 'api/utils/paginate'

// TODO: brand (name and year), sort by year
export default async (args, ctx) => {
  const query = args.query.toLowerCase()
  try {
    return paginate(ctx.db.Model, args, {
      relations: ['brand'],
      where: {
        model: Raw(alias => `LOWER (${alias}) LIKE '%${query}%'`),
        // year: query,
      },
    })
  } catch (err) {
    console.log(err)
  }
}
