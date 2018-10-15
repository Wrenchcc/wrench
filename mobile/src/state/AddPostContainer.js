import { Container } from 'unstated'
import { CameraRoll } from 'react-native'

export default class AddPostContainer extends Container {
  state = {
    selectedFiles: [],
    selectedIndex: 0,
    selectedProjectIndex: 0,
    selectProjectOpen: false,
    caption: null,
  }

  toggleSelectProject = () => {
    this.setState(prevState => ({ selectProjectOpen: !prevState.selectProjectOpen }))
  }

  closeSelectProject = () => {
    this.setState({ selectProjectOpen: false })
  }

  updateCaption = caption => {
    this.setState({ caption })
  }

  changeProject = selectedProjectIndex => {
    this.closeSelectProject()
    this.setState({ selectedProjectIndex })
  }

  addSelectedFiles = (selectedFiles, selectedIndex) => {
    this.setState({ selectedFiles, selectedIndex })
  }

  onCropping = crop => {
    const { selectedFiles, selectedIndex } = this.state

    selectedFiles[selectedIndex] = {
      ...selectedFiles[selectedIndex],
      crop,
    }

    this.setState({ selectedFiles, selectedIndex: 0 })
  }

  onTakePicture = async file => {
    const savedFile = await CameraRoll.saveToCameraRoll(file.uri)
    this.setState({
      selectedFiles: [{ ...file, uri: savedFile, new_camera_file: true }],
      selectedIndex: 0,
    })
  }
}
