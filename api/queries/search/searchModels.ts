import { Raw, Like } from 'typeorm'
import paginate from 'api/utils/paginate'

// TODO: brand (name and year), sort by year
// SELECT * FROM "brands"
// JOIN "models" ON "models.brandId" = "brands"."id"
// WHERE "brands"."name" LIKE '%query%' AND "models"."name" LIKE '%query%' AND "models"."year" LIKE '%query%'
export default async (args, ctx) => {
  const query = args.query.toLowerCase()
  try {
    return paginate(ctx.db.Model, args, {
      relations: ['brand'],
      where: {
        brand: '',
        model: Raw(alias => `LOWER (${alias}) LIKE '%${query}%'`),
        // year: Like(`%${query}%`),
      },
    })
  } catch (err) {
    console.log(err)
  }
}
