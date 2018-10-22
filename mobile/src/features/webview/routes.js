import { MODAL } from 'navigation'
import WebView from './containers/WebView'
import { ROUTE_NAMES } from './constants'

export default {
  [ROUTE_NAMES.WEBVIEW]: {
    component: WebView,
    mode: MODAL,
    navigationOptions: {
      header: null,
    },
  },
}
