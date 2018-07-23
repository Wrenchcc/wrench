import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { CommentField, Gateway, Mention } from 'ui'
import List from './List'
import { Base } from './styles'

export default class Comments extends PureComponent {
  static propTypes = {
    data: PropTypes.array,
  }

  state = {
    isOpen: false,
    query: '',
    text: '',
  }

  onChangeText = text => {
    this.setState({ text })
  }

  onMention = query => {
    this.setState({ query })
  }

  onMentionPress = ({ userName }) => {
    const comment = this.state.text.slice(0, -this.state.query.length - 1)
    this.setState({ text: `${comment}@${userName} ` })
    this.closeMention()
  }

  setRef = el => {
    this.commentField = el
  }

  openMention = () => {
    this.setState({ isOpen: true })
  }

  closeMention = () => {
    this.setState({ isOpen: false })
    this.commentField.stopTracking()
  }

  handleSubmit = () => {
    // TODO: Submit and add to list
  }

  renderMention = () => (
    <Gateway.Consumer into="mention">
      <Mention
        query={this.state.query}
        onPress={this.onMentionPress}
        onNoResults={this.closeMention}
      />
    </Gateway.Consumer>
  )

  render() {
    return (
      <Base>
        {this.state.isOpen && this.renderMention()}
        <CommentField
          onRef={this.setRef}
          disabled={this.state.text.length === 0}
          onChangeText={this.onChangeText}
          onMention={this.onMention}
          onSubmit={this.handleSubmit}
          value={this.state.text}
          openMention={this.openMention}
          closeMention={this.closeMention}
        />

        <List data={this.props.data} />
      </Base>
    )
  }
}
