import { MODAL, MODAL_STACK } from 'navigation'
import AddPost from './containers/AddPost'
import AddMedia from './containers/AddMedia'
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
  [ROUTE_NAMES.ADD_MEDIA]: {
    component: AddMedia,
    mode: MODAL,
  },
  [ROUTE_NAMES.ADD_POST]: {
    component: AddPost,
    mode: MODAL_STACK,
    navigationOptions: {
      header: null,
    },
  },
  [ROUTE_NAMES.EDIT_PROJECT]: {
    component: EditProject,
    mode: MODAL,
  },
  [ROUTE_NAMES.FOLLOWERS]: {
    component: Followers,
  },
}
