import { Container } from 'unstated'

export default class AddProjectContainer extends Container {
  state = {
    title: null,
    model: null,
    category: null,
  }

  updateField = (field, value) => {
    this.setState({
      [field]: value,
    })
  }
}
