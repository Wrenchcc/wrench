import * as Parser from 'rss-parser'
import * as cheerio from 'cheerio'
import * as fetch from 'node-fetch'
import saveArticle from '../utils/saveArticle2'

const FEED_URL = 'https://themotoblogs.com/feed/'
const PROVIDER = 'themotoblogs'

const parser = new Parser()

const images = []

export default async () => {
  try {
    const response = await parser.parseURL(FEED_URL)

    const item = response.items[2]
    const res = await fetch(item.link)
    const html = await res.text()
    const $ = cheerio.load(html)

    $('.size-large').each((i, image) => {
      images.push($(image).attr('src'))
    })

    await saveArticle(FEED_URL, PROVIDER, item, images)
  } catch (err) {
    console.log(err)
  }
}
