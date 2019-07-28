import article from './article'
import articles from './articles'
import publisher from './publisher'
import filesConnection from './filesConnection'

export default {
  Article: {
    filesConnection,
    publisher,
  },
  Query: {
    article,
    articles,
  },
}
