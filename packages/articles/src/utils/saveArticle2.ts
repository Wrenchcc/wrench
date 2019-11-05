import stripNewLines from './stripNewLines'

export default async function saveArticle(feed, provider, item, images) {
  try {
    // if (uploadedFiles.length > 0) {
    //   const [files, author, categories, publisher] = await Promise.all([
    //     db.ArticleFile.save(uploadedFiles),
    //     db.ArticleAuthor.findOrCreate(item.creator),
    //     db.ArticleCategory.findOrCreate(item.categories),
    //     db.ArticlePublisher.findOne({ where: { slug: provider } }),
    //   ])

      // await db.ArticlePublisher.update(publisher.id, { updatedAt: new Date(item.isoDate) })

      // const data = await db.Article.save({
      //   author,
      //   createdAt: new Date(item.isoDate),
      //   description: stripNewLines(item.contentSnippet),
      //   files,
      //   publisher,
      //   title: item.title,
      //   url: item.link,
      // })

      // const articleCategories = categories.map(({ id }) => ({
      //   articleId: data.id,
      //   categoryId: id,
      // }))

      // await db.ArticleCategoryRelationships.save(articleCategories)

      return {
        provider,
        images,
        categories: articleCategories,
        author: item.creator,
        createdAt: new Date(item.isoDate),
        description: stripNewLines(item.contentSnippet),
        title: item.title,
        url: item.link,
      }
    }
  } catch (err) {
    console.log(err)
  }
}
