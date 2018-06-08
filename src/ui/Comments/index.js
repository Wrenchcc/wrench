import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Keyboard } from 'react-native'
import { CommentField } from 'ui'
import List from './List'
import { Base } from './styles'

export default class Comments extends PureComponent {
  static propTypes = {
    data: PropTypes.array,
  }

  state = {
    text: '',
  }

  handleChangeText = text => {
    this.setState({ text })
  }

  handleSubmit = () => {
    // TODO: Submit and add to list
    this.handleChangeText('')
    Keyboard.dismiss()
  }

  render = () => (
    <Base>
      <CommentField
        onChangeText={this.handleChangeText}
        onSubmit={this.handleSubmit}
        disabled={this.state.text.length === 0}
        value={this.state.text}
      />
      <List data={this.props.data} />
    </Base>
  )
}
