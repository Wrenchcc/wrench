import { compose, replace, split, empty, pathOr } from 'ramda'
import { navigate } from 'navigation'

const DOMAIN = 'https://wrench.cc/'

// TODO: Map params better
export const navigateBasedOnPath = url => compose(
  path => {
    const routeName = pathOr(null, [0], path)
    let params

    switch (routeName) {
      case 'project':
        params = { project: { slug: pathOr(null, [1], path) } }
        break
      case 'user':
        params = { user: { username: pathOr(null, [1], path) } }
        break
      default:
    }

    return navigate(routeName, params)
  },
  split('/'),
  replace(DOMAIN, empty(url))
)(url)
