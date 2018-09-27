import ImageManipulator from 'react-native-image-manipulator'

const DEFAULT_SIZE = 2048
// ImageManipulator.manipulate(
//   'assets-library://asset/asset.HEIC?id=CC95F08C-88C3-4012-9D6D-64A413D254B3&ext=HEIC',
//   [{ resize: { width: DEFAULT_SIZE, height: DEFAULT_SIZE } }],
//   { format: 'png' }
// ).then(e => console.log(e))

// TODO: Fix scaling
export default async uri => ImageManipulator.manipulate(uri, [{ resize: { width: DEFAULT_SIZE, height: DEFAULT_SIZE } }], {
  compress: 0.8,
})
