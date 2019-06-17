import AsyncStorage from '@react-native-community/async-storage'
import { Container } from 'unstated'
import { assocPath } from 'ramda'
import { logError } from 'utils/sentry'
import { SELECTED_PROJECT_KEY } from 'utils/storage/constants'

class AddContainer extends Container {
  state = {
    cameraFile: null,
    caption: null,
    isSaving: false,
    isSearching: false,
    model: null,
    postProgress: null,
    query: '',
    selectedFiles: [],
    selectedIndex: 0,
    selectedProjectId: null,
    selectProjectOpen: false,
    title: null,
    type: null,
  }

  constructor() {
    super()
    this.loadInitialState()
  }

  loadInitialState = async () => {
    const selectedProjectId = await AsyncStorage.getItem(SELECTED_PROJECT_KEY)
    if (selectedProjectId) {
      this.setState({ selectedProjectId })
    }
  }

  get selectedFile() {
    return this.state.selectedFiles[this.state.selectedIndex]
  }

  resetState = () => {
    this.setState({
      cameraFile: null,
      caption: null,
      isSaving: false,
      isSearching: false,
      model: null,
      postProgress: null,
      query: '',
      selectedFiles: [],
      selectedIndex: 0,
      selectProjectOpen: false,
      title: null,
      type: null,
    })
  }

  updateField = (field, value) => {
    if (field === 'query') {
      this.setState({
        isSearching: true,
        model: null,
      })
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
      AsyncStorage.setItem(SELECTED_PROJECT_KEY, selectedProjectId)
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
    this.setState({
      cameraFile: file,
      selectedFiles: [{ ...file }],
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

export default new AddContainer()
