import ImageManipulator from 'react-native-image-manipulator'

const DEFAULT_SIZE = 2048

export default async uri => ImageManipulator.manipulate(
  uri,
  [
    {
      resize: {
        width: DEFAULT_SIZE,
        height: DEFAULT_SIZE,
      },
    },
  ],
  {
    compress: 0.8,
  }
)
