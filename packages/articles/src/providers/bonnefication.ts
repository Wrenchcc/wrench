import * as Parser from 'rss-parser'
import * as cheerio from 'cheerio'
import * as fetch from 'node-fetch'
import saveArticle from '../utils/saveArticle2'

const FEED_URL = 'http://www.bonnefication.com/feed/'
const PROVIDER = 'bonnefication'

const parser = new Parser()

const images = []

export default async () => {
  try {
    const response = await parser.parseURL(FEED_URL)

    const item = response.items[0]
    const res = await fetch(item.link)
    const html = await res.text()
    const $ = cheerio.load(html)

    $('.size-full').each((i, image) => {
      images.push($(image).attr('src'))
    })

    await saveArticle(PROVIDER, item, images)
  } catch (err) {
    console.log(err)
  }
}
