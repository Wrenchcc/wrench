import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'react-apollo'
import { addCommentToPost } from 'graphql-old/mutations/comment/addComment'
import CommentField from 'ui/CommentField'
import Mention from 'ui/Mention'
import List from './List'

class Comments extends PureComponent {
  static propTypes = {
    addComment: PropTypes.func.isRequired,
    data: PropTypes.object,
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

  onMentionPress = ({ username }) => {
    const comment = this.state.text.slice(0, -this.state.query.length - 1)
    this.setState({ text: `${comment}@${username} ` })
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
    const { id } = this.props.data
    const { text } = this.state
    this.props.addComment(id, text)
  }

  render() {
    return (
      <>
        {this.state.isOpen && (
          <Mention
            query={this.state.query}
            onPress={this.onMentionPress}
            onNoResults={this.closeMention}
            destination="global"
          />
        )}
        <CommentField
          onRef={this.setRef}
          onChangeText={this.onChangeText}
          onMention={this.onMention}
          onSubmit={this.handleSubmit}
          value={this.state.text}
          openMention={this.openMention}
          closeMention={this.closeMention}
          disabled={this.state.text.length === 0}
        />

        <List data={this.props.data} />
      </>
    )
  }
}

export default compose(addCommentToPost)(Comments)
