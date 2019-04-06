import Post from './containers/Post'
import { ROUTE_NAMES } from './constants'

export default {
  [ROUTE_NAMES.POST]: {
    component: Post,
    path: 'post/:id',
  },
}
