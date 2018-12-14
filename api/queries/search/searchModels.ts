import { Raw } from 'typeorm'
import paginate from 'api/utils/paginate'

// TODO: search by model and brand, sort by year
export default async (args, ctx) => {
  try {
    return paginate(ctx.db.Model, args, {
      relations: ['brand'],
      where: { model: Raw(alias => `LOWER (${alias}) LIKE '%${args.query.toLowerCase()}%'`) },
    })
  } catch (err) {
    console.log(err)
  }
}
