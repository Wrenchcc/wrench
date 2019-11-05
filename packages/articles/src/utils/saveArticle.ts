import * as Parser from 'rss-parser'
import extractImageSources from './extractImageSources'
import stripNewLines from './stripNewLines'

const parser = new Parser({
  customFields: {
    item: ['media:content'],
  },
})

export default async function saveArticle(feed, provider) {
  try {
    let images
    const response = await parser.parseURL(feed)

    const item = response.items[0]

    switch (provider) {
      case 'returnofthecaferacers': {
        images = [item['media:content'].$.url]
      }
      case 'themotoblogs': {
        images = [item.content.$.url]
      }
      default:
        {
          images = extractImageSources(item['content:encoded'])
        }

        return {
          provider,
          images,
          categories: item.categories,
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
