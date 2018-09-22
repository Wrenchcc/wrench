import { ImageStore } from 'react-native'

export default uris => {
  uris.map(uri => ImageStore.removeImageForTag(uri))
}
