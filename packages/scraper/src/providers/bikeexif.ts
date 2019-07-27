import * as Parser from 'rss-parser'
import { connection, db } from '../models'
import uploadToS3 from '../utils/uploadToS3'
import extractImageSources from '../utils/extractImageSources'

const parser = new Parser()

const url = 'http://www.bikeexif.com/feed'

export default async () => {
  await connection()

  try {
    const response = await parser.parseURL(url)

    const item = response.items[0]

    const images = extractImageSources(item['content:encoded'])
    const blah = await uploadToS3(images)

    return {
      categories: item.categories,
      creator: item.creator,
      date: item.isoDate,
      description: item.contentSnippet.replace(/(\r\n|\n|\r)/gm, ''),
      images,
      link: item.link,
      title: item.title,
    }

    // response.items.forEach(item => {
    //   const images = extractImageSources(item['content:encoded'])
    //
    //   return {
    //     categories: item.categories,
    //     creator: item.creator,
    //     date: item.isoDate,
    //     description: item.contentSnippet.replace(/(\r\n|\n|\r)/gm, ''),
    //     images,
    //     link: item.link,
    //     title: item.title,
    //   }
    // })
  } catch (err) {
    // console.log(err)
  }
}
