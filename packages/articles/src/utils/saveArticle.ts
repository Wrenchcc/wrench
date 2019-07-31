import * as Parser from 'rss-parser'
import { connection, db } from '../models'
import uploadToS3 from './uploadToS3'
import extractImageSources from './extractImageSources'
import stripNewLines from './stripNewLines'

const parser = new Parser({
  customFields: {
    item: ['media:content'],
  },
})

export default async function saveArticle(feed, provider) {
  await connection()

  try {
    let images
    const response = await parser.parseURL(feed)

    const item = response.items[0]

    const article = await db.Article.findOne({ where: { url: item.link } })

    if (!article) {
      switch (provider) {
        case 'returnofthecaferacers': {
          images = [item['media:content'].$.url]
        }
        case 'themotoblogs': {
          images = [item.content.$.url]
        }
        default: {
          images = extractImageSources(item['content:encoded'])
        }
      }

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
