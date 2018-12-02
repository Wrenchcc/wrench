import { Like } from 'typeorm'
import paginate from 'api/utils/paginate'

// TODO: search by model and brand, sort by year
// LOWER
export default async (args, ctx) => {
  try {
    return paginate(ctx.db.Model, args, {
      relations: ['brand'],
      where: { model: Like(`%${args.query}%`) },
    })
  } catch (err) {
    console.log(err)
  }
}
