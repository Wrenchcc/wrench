import { ImageStore } from 'react-native'

export default uri => new Promise(resolve => {
  resolve(ImageStore.removeImageForTag(uri))
})
