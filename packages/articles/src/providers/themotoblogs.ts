import * as Parser from 'rss-parser'
import * as cheerio from 'cheerio'
import * as fetch from 'node-fetch'
import request from '../utils/request'
import stripNewLines from '../utils/stripNewLines'

const FEED_URL = 'https://themotoblogs.com/feed/'
const PROVIDER = 'themotoblogs'

const parser = new Parser()

const files = []

export default async () => {
  try {
    const response = await parser.parseURL(FEED_URL)

    const item = response.items[0]
    const res = await fetch(item.link)
    const html = await res.text()
    const $ = cheerio.load(html)

    $('.size-large').each((i, image) => {
      files.push($(image).attr('src'))
    })

    const data = {
      author: item.creator,
      categories: item.categories,
      createdAt: new Date(item.isoDate),
      description: stripNewLines(item.contentSnippet),
      files,
      publisher: PROVIDER,
      title: item.title,
      url: item.link,
    }

    await request(data)
  } catch (err) {
    console.log(err)
  }
}
