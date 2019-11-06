import * as Parser from 'rss-parser'
import * as cheerio from 'cheerio'
import * as fetch from 'node-fetch'
import stripNewLines from '../utils/stripNewLines'
import request from '../utils/request'

const FEED_URL = 'http://deuscustoms.com/feed/'
const PROVIDER = 'deuscustoms'

const parser = new Parser()

const files = []

export default async () => {
  try {
    const response = await parser.parseURL(FEED_URL)

    const item = response.items[0]
    const res = await fetch(item.link)
    const html = await res.text()
    const $ = cheerio.load(html)

    $('.fade-magnify').each((i, image) => {
      files.push($(image).attr('href'))
    })

    const data = {
      author: item.creator,
      categories: item.categories,
      createdAt: new Date(item.isoDate),
      description: stripNewLines(item.contentSnippet),
      files: files.slice(0, 10),
      publisher: PROVIDER,
      title: item.title,
      url: item.link,
    }

    await request(data)
  } catch (err) {
    console.log(err)
  }
}
