import { Like } from 'typeorm'
import paginate from 'api/utils/paginate'

// TODO: LOWER
export default async (args, ctx) => {
  try {
    return paginate(ctx.db.Project, args, {
      relations: ['user'],
      where: { title: Like(`%${args.query}%`) },
    })
  } catch (err) {
    console.log(err)
  }
}
