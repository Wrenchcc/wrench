import * as Parser from 'rss-parser'
import extractImageSources from '../utils/extractImageSources'

const parser = new Parser()

const url = 'http://deuscustoms.com/feed/'

export default async () => {
  try {
    const response = await parser.parseURL(url)

    response.items.forEach(item => {
      // const images = extractImageSources(item['content:encoded'])
      console.log(item)
      // return {
      //   categories: item.categories,
      //   content: item.contentSnippet,
      //   creator: item.creator,
      //   date: item.isoDate,
      //   images,
      //   link: item.link,
      //   title: item.title,
      // }
    })
  } catch (err) {
    console.log(err)
  }
}
