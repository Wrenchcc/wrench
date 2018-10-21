import { Container } from 'unstated'

export default class AddProjectContainer extends Container {
  state = {
    title: null,
  }

  updateField = (field, value) => {
    this.setState({
      [field]: value,
    })
  }
}
