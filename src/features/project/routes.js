import { MODAL } from 'navigation'
import withStatusBar from 'navigation/utils/withStatusBar'
import Project from './containers/Project'
import Comments from './containers/Comments'
import Followers from './containers/Followers'
import AddPost from './containers/AddPost'
import AddProject from './containers/AddProject'
import { ROUTE_NAMES } from './constants'

export default {
  [ROUTE_NAMES.PROJECT]: {
    component: Project,
  },
  [ROUTE_NAMES.COMMENTS]: {
    component: Comments,
  },
  [ROUTE_NAMES.ADD_POST]: {
    component: withStatusBar(AddPost, { hidden: true }),
    mode: MODAL,
  },
  [ROUTE_NAMES.ADD_PROJECT]: {
    component: AddProject,
    mode: MODAL,
  },
  [ROUTE_NAMES.FOLLOWERS]: {
    component: Followers,
  },
}
