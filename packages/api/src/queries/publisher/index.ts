import publisher from './publisher'
import publishers from './publishers'
import articlesConnection from './articlesConnection'
import url from './url'

export default {
  Publisher: {
    articlesConnection,
    url,
  },
  Query: {
    publisher,
    publishers,
  },
}
