import stripNewLines from './stripNewLines'

export default async function saveArticle(provider, item, images) {
  try {
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
  } catch (err) {
    console.log(err)
  }
}
