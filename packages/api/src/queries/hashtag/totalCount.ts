import { Raw } from 'typeorm'

// TODO: Use dataloader
export default async ({ slug }, _, ctx) => {
  const [, totalCount] = await ctx.db.Post.findAndCount({
    where: {
      caption: Raw(alias => `LOWER (${alias}) LIKE '%#${slug.toLowerCase()}%'`),
    },
  })

  return totalCount
}
