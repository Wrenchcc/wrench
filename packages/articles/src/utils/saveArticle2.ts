import { connection, db } from '../models'
import uploadToS3 from './uploadToS3'
import stripNewLines from './stripNewLines'

export default async function saveArticle(feed, provider, item, images) {
  await connection()

  try {
    const article = await db.Article.findOne({ where: { url: item.link } })

    if (!article) {
      const uploadedFiles = await uploadToS3(images)

      if (uploadedFiles.length > 0) {
        const [files, author, categories, publisher] = await Promise.all([
          db.ArticleFile.save(uploadedFiles),
          db.ArticleAuthor.findOrCreate(item.creator),
          db.ArticleCategory.findOrCreate(item.categories),
          db.ArticlePublisher.findOne({ where: { slug: provider } }),
        ])

        await db.ArticlePublisher.update(publisher.id, { updatedAt: new Date(item.isoDate) })

        const data = await db.Article.save({
          author,
          createdAt: new Date(item.isoDate),
          description: stripNewLines(item.contentSnippet),
          files,
          publisher,
          title: item.title,
          url: item.link,
        })

        const articleCategories = categories.map(({ id }) => ({
          articleId: data.id,
          categoryId: id,
        }))

        await db.ArticleCategoryRelationships.save(articleCategories)
      }
    }
  } catch (err) {
    console.log(err)
  }
}
