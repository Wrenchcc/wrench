import { Container } from 'unstated'

export default class AddProjectContainer extends Container {
  state = {
    title: null,
    model: null,
    type: null,
    query: '',
    isSearching: false,
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
}
