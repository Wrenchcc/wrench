import { In } from 'typeorm'
import paginate from '../../utils/paginate'

export default async ({ id }, args, ctx) => {
  const categories = await ctx.db.ArticleCategoryRelationships.find({
    articleId: id,
  })

  const ids = categories.map(({ categoryId }) => categoryId)

  return paginate(ctx.db.ArticleCategory, args, {
    where: [{ id: ids.length ? In(ids) : null }],
  })
}
