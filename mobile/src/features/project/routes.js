import { MODAL, MODAL_STACK } from 'navigation'
import AddCaption from './containers/AddCaption'
import AddPost from './containers/AddPost'
import Comments from './containers/Comments'
import EditProject from './containers/EditProject'
import Followers from './containers/Followers'
import Project from './containers/Project'
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
  [ROUTE_NAMES.ADD_CAPTION]: {
    component: AddCaption,
    mode: MODAL_STACK,
    navigationOptions: {
      header: null,
    },
  },
  [ROUTE_NAMES.FOLLOWERS]: {
    component: Followers,
  },
}
