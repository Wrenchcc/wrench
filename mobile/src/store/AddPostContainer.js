import { Container } from 'unstated'
import { CameraRoll } from 'react-native'
import { assocPath } from 'ramda'
import LocalStorage from 'utils/storage/local'

const SELECTED_PROJECT_STORAGE_KEY = 'wrench:selectedProjectId'

// TODO: Reset state better
export default class AddPostContainer extends Container {
  state = {
    caption: null,
    postProgress: null,
    selectedFiles: [],
    selectedIndex: 0,
    selectedProjectId: null,
    selectProjectOpen: false,
  }

  constructor() {
    super()
    this.loadInitialState()
  }

  loadInitialState = async () => {
    const selectedProjectId = await LocalStorage.getItem(SELECTED_PROJECT_STORAGE_KEY)
    if (selectedProjectId) {
      this.setState({ selectedProjectId })
    }
  }

  get selectedFile() {
    return this.state.selectedFiles[this.state.selectedIndex]
  }

  resetState = () => {
    this.setState({
      caption: null,
      postProgress: null,
      selectedFiles: [],
      selectedIndex: 0,
      selectedProjectId: null,
      selectProjectOpen: false,
    })
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

  changeProject = selectedProjectId => {
    this.setState({ selectedProjectId }, () => {
      this.closeSelectProject()
      LocalStorage.setItem(SELECTED_PROJECT_STORAGE_KEY, selectedProjectId)
    })
  }

  addSelectedFiles = (selectedFiles, selectedIndex) => {
    this.setState({ selectedFiles, selectedIndex })
  }

  onCropping = crop => {
    const { selectedFiles, selectedIndex } = this.state

    this.setState({
      selectedFiles: assocPath([selectedIndex, 'crop'], crop, selectedFiles),
    })
  }

  onTakePicture = async file => {
    const savedFile = await CameraRoll.saveToCameraRoll(file.uri)

    // TODO: generate filename and get size for cropping
    this.setState({
      selectedFiles: [{ ...file, uri: savedFile, filename: 'new.jpg', new_camera_file: true }],
      selectedIndex: 0,
    })
  }

  showPostProgress = data => {
    this.setState({ postProgress: data })
  }
}
