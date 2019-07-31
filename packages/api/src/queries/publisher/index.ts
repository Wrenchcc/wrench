import articlesConnection from './articlesConnection'
import publisher from './publisher'
import publishers from './publishers'
import seen from './seen'
import url from './url'

export default {
  Publisher: {
    articlesConnection,
    seen,
    url,
  },
  Query: {
    publisher,
    publishers,
  },
}
