import * as Parser from 'rss-parser'
import * as cheerio from 'cheerio'
import * as fetch from 'node-fetch'
import saveArticle from '../utils/saveArticle2'

const FEED_URL = 'http://deuscustoms.com/feed/'
const PROVIDER = 'deuscustoms'

const parser = new Parser()

const images = []

export default async () => {
  try {
    const response = await parser.parseURL(FEED_URL)

    const item = response.items[0]
    const res = await fetch(item.link)
    const html = await res.text()
    const $ = cheerio.load(html)

    $('.fade-magnify').each((i, image) => {
      images.push($(image).attr('href'))
    })

    await saveArticle(FEED_URL, PROVIDER, item, images.slice(0, 10))
  } catch (err) {
    console.log(err)
  }
}
