import stripNewLines from './stripNewLines'

export default async function saveArticle(provider, item, images) {
  try {
    return {
      author: item.creator,
      categories: item.categories,
      createdAt: new Date(item.isoDate),
      description: stripNewLines(item.contentSnippet),
      images,
      provider,
      title: item.title,
      url: item.link,
    }
  } catch (err) {
    console.log(err)
  }
}
