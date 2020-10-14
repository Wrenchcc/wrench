import { Raw } from 'typeorm'
import paginate from '../../utils/paginate'

// TODO: Use dataloader
export default async ({ name }, args, ctx) =>
  paginate(ctx.db.Post, args, {
    where: {
      caption: Raw((alias) => `(${alias}) LIKE '%#${name}%'`),
    },
  })
