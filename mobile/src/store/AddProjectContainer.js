import { Container } from 'unstated'

export default class AddProjectContainer extends Container {
  state = {
    title: null,
    model: null,
    category: null,
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

    // if (
    //   field === 'query'
    //   && value < this.state.model
    //   && `${this.state.model.brand} ${this.state.model.model}`
    // ) {
    //   this.updateField('model', null)
    //   this.updateField('query', '')
    // }

    this.setState({
      [field]: value,
    })
  }
}
