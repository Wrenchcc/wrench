import axios from 'axios'
import { v4 } from 'uuid'
import s3 from '../../services/s3/client'

const debug = require('debug')('api:mutations:article:add-article')

const AWS_S3_BUCKET = 'wrench-files'
const UPLOAD_DIRECTORY = 'articles'

async function downloadAndUploadToS3(files) {
  try {
    const results = await Promise.all(
      files
        .map(async url => {
          const { data } = await axios.get(encodeURI(url), {
            responseType: 'arraybuffer',
          })

          const filename = `${v4()}.jpg`

          await s3
            .upload({
              Body: data,
              Bucket: AWS_S3_BUCKET,
              Key: `${UPLOAD_DIRECTORY}/${filename}`,
            })
            .promise()

          return { filename }
        })
        .map(p => p.catch(() => undefined))
    ).then(res => res)

    return results.filter(image => image !== undefined)
  } catch (err) {
    debug(err)
  }
}

// TODO: Auth
export default async (_, { input }, ctx) => {
  const article = await ctx.db.Article.findOne({
    where: {
      url: input.url,
    },
  })

  if (article) {
    return
  }

  try {
    const uploadedFiles = await downloadAndUploadToS3(input.files)

    if (uploadedFiles.length > 0) {
      const date = new Date(input.createdAt)

      const [files, author, categories, publisher] = await Promise.all([
        ctx.db.ArticleFile.save(uploadedFiles),
        ctx.db.ArticleAuthor.findOrCreate(input.author),
        ctx.db.ArticleCategory.findOrCreate(input.categories),
        ctx.db.ArticlePublisher.findOne({
          where: {
            slug: input.publisher,
          },
        }),
      ])

      await ctx.db.ArticlePublisher.update(publisher.id, {
        updatedAt: date,
      })

      const data = await ctx.db.Article.save({
        author,
        createdAt: date,
        description: input.description,
        files,
        publisher,
        title: input.title,
        url: input.url,
      })

      const articleCategories = categories.map(({ id }) => ({
        articleId: data.id,
        categoryId: id,
      }))

      await ctx.db.ArticleCategoryRelationships.save(articleCategories)
    }
  } catch (err) {
    debug(err)
  }
}
