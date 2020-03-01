import { Raw } from 'typeorm'
import paginate from '../../utils/paginate'

// TODO: Use dataloader
export default async ({ slug }, args, ctx) =>
  paginate(ctx.db.Post, args, {
    where: {
      caption: Raw(alias => `LOWER (${alias}) LIKE '%#${slug.toLowerCase()}%'`),
    },
  })
