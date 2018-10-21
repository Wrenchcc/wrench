import { MODAL, MODAL_STACK } from 'navigation'
import AddPost from './containers/AddPost'
import AddProject from './containers/AddProject'
import AddProjectCategory from './containers/AddProjectCategory'
import AddMedia from './containers/AddMedia'
import Comments from './containers/Comments'
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
  [ROUTE_NAMES.FOLLOWERS]: {
    component: Followers,
  },
  [ROUTE_NAMES.ADD_PROJECT]: {
    component: AddProject,
    mode: MODAL,
    navigationOptions: {
      header: null,
    },
  },
  [ROUTE_NAMES.ADD_PROJECT_CATEGORY]: {
    component: AddProjectCategory,
    mode: MODAL_STACK,
    navigationOptions: {
      headerTitle: 'Add project',
    },
  },
}
