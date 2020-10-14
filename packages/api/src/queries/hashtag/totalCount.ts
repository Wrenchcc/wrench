import { Raw } from 'typeorm'

// TODO: Use dataloader
export default async ({ name }, _, ctx) => {
  const [, totalCount] = await ctx.db.Post.findAndCount({
    where: {
      caption: Raw((alias) => `(${alias}) LIKE '%#${name}%'`),
    },
  })

  return totalCount
}
