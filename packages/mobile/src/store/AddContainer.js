import { Container } from 'unstated'
import { CameraRoll } from 'react-native'
import { assocPath } from 'ramda'
import LocalStorage from 'utils/storage/local'

const SELECTED_PROJECT_STORAGE_KEY = 'wrench:selectedProjectId'

export default class AddContainer extends Container {
  state = {
    caption: null,
    postProgress: null,
    selectedFiles: [],
    selectedIndex: 0,
    selectedProjectId: null,
    selectProjectOpen: false,
    isSearching: false,
    isSaving: false,
    query: '',
    title: null,
    model: null,
    type: null,
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
      selectProjectOpen: false,
      isSearching: false,
      isSaving: false,
      query: '',
      title: null,
      model: null,
      type: null,
    })
  }

  updateField = (field, value) => {
    if (field === 'query') {
      this.setState({ isSearching: true })
    }

    if (field === 'model') {
      this.setState({ isSearching: false })
    }

    this.setState({
      [field]: value,
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

  onEditImage = crop => {
    const { selectedFiles, selectedIndex } = this.state

    this.setState({
      selectedFiles: assocPath([selectedIndex, 'crop'], crop, selectedFiles),
    })
  }

  onTakePicture = async file => {
    const savedFile = await CameraRoll.saveToCameraRoll(file.uri)

    this.setState({
      selectedFiles: [
        { ...file, uri: savedFile, filename: `${savedFile}.jpg`, new_camera_file: true },
      ],
      selectedIndex: 0,
    })
  }

  showPostProgress = data => {
    this.setState({ postProgress: data })
  }

  hidePostProgress = () => {
    this.setState({ postProgress: null })
  }
}
