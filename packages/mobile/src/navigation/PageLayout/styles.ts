import { isAndroid } from 'utils/platform'

const OFFSET = 90

export default {
  contentContainerStyle: {
    paddingTop: isAndroid ? OFFSET : 0,
  },
}
