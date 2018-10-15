import { Container } from 'unstated'
import { CameraRoll } from 'react-native'

export default class PostContainer extends Container {
  state = {
    selectedFiles: [],
    selectedIndex: 0,
    selectedProject: null,
    dropdownOpen: false,
  }

  toggleDropdown = () => {}

  changeProject = selectedProject => {
    this.setState({ selectedProject })
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
