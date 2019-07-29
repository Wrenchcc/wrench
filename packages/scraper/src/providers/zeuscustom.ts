import * as Parser from 'rss-parser'
import { connection, db } from '../models'
import uploadToS3 from '../utils/uploadToS3'
import extractImageSources from '../utils/extractImageSources'
import stripNewLines from '../utils/stripNewLines'

const parser = new Parser()
const FEED_URL = 'http://zeuscustom.shop/feed/'
const PUBLISHER = 'zeuscustom'

export default async () => {
  await connection()

  try {
    const response = await parser.parseURL(FEED_URL)

    const item = response.items[1]

    const article = await db.Article.findOne({ where: { url: item.link } })

    if (!article) {
      const images = extractImageSources(item['content:encoded'])

      const [uploadedFiles, author, categories, publisher] = await Promise.all([
        uploadToS3(images),
        db.ArticleAuthor.findOrCreate(item.creator),
        db.ArticleCategory.findOrCreate(item.categories),
        db.ArticlePublisher.findOne({ where: { slug: PUBLISHER } }),
      ])

      const files = await db.ArticleFile.save(uploadedFiles)

      await db.Article.save({
        author,
        categories,
        description: stripNewLines(item.contentSnippet),
        files,
        publishedAt: item.isoDate,
        publisher,
        title: item.title,
        url: item.link,
      })
    }
  } catch (err) {
    // console.log(err)
  }
}
