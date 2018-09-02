import { MODAL } from 'navigation'
import Project from './containers/Project'
import Comments from './containers/Comments'
import Followers from './containers/Followers'
import AddPost from './containers/AddPost'
import EditProject from './containers/EditProject'
import { ROUTE_NAMES } from './constants'

export default {
  [ROUTE_NAMES.PROJECT]: {
    component: Project,
  },
  [ROUTE_NAMES.COMMENTS]: {
    component: Comments,
  },
  [ROUTE_NAMES.ADD_POST]: {
    component: AddPost,
    mode: MODAL,
  },
  [ROUTE_NAMES.EDIT_PROJECT]: {
    component: EditProject,
    mode: MODAL,
  },
  [ROUTE_NAMES.FOLLOWERS]: {
    component: Followers,
  },
}
