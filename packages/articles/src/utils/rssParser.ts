import * as Parser from 'rss-parser'
import extractImageSources from './extractImageSources'
import stripNewLines from './stripNewLines'

const parser = new Parser({
  customFields: {
    item: ['media:content'],
  },
})

export default async function rssParser(feed, publisher) {
  try {
    let files
    const response = await parser.parseURL(feed)

    const item = response.items[0]

    switch (publisher) {
      case 'returnofthecaferacers': {
        files = [item['media:content'].$.url]
      }
      case 'themotoblogs': {
        // @ts-ignore
        files = [item.content.$.url]
      }
      default:
        {
          files = extractImageSources(item['content:encoded'])
        }

        return {
          author: item.creator,
          categories: item.categories,
          createdAt: new Date(item.isoDate),
          description: stripNewLines(item.contentSnippet),
          files,
          publisher,
          title: item.title,
          url: item.link,
        }
    }
  } catch (err) {
    console.log(err)
  }
}
