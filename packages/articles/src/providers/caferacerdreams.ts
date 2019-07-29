import saveArticle from '../utils/saveArticle'

const FEED_URL = 'https://www.caferacerdreams.es/en/blog/feed/'
const PROVIDER = 'caferacerdreams'

export default async () => {
  try {
    await saveArticle(FEED_URL, PROVIDER)
  } catch (err) {
    console.log(err)
  }
}
