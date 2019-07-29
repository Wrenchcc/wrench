import saveArticle from '../utils/saveArticle'

const FEED_URL = 'https://hookie.co/journal/feed/'
const PROVIDER = 'hookie'

export default async () => {
  try {
    await saveArticle(FEED_URL, PROVIDER)
  } catch (err) {
    console.log(err)
  }
}
