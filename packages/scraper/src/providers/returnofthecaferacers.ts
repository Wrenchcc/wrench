import * as Parser from 'rss-parser'
import extractImageSources from '../utils/extractImageSources'

const parser = new Parser()

const url = 'https://www.returnofthecaferacers.com/feed/'

export default async () => {
  try {
    const response = await parser.parseURL(url)

    response.items.forEach(item => {
      extractImageSources(item['content:encoded'])
    })
  } catch (err) {
    console.log(err)
  }
}
