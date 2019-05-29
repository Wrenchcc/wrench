import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { showMention, dismissMention } from 'navigation'
import { addCommentToPost } from 'graphql/mutations/comment/addComment'
import CommentField from 'ui/CommentField'
import List from './List'

// setTimeout(() => showMention(), 3000)
//
// setTimeout(() => dismissMention(), 10000)

class Comments extends PureComponent {
  static propTypes = {
    addComment: PropTypes.func.isRequired,
    data: PropTypes.object,
  }

  state = {
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
    // TODO: Check if open
    // alert('e')
    showMention()
  }

  closeMention = () => {
    dismissMention()
    // this.commentField.stopTracking()
  }

  handleSubmit = () => {
    const { id } = this.props.data
    const { text } = this.state
    this.props.addComment(id, text)
  }

  render() {
    return (
      <Fragment>
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
      </Fragment>
    )
  }
}

export default addCommentToPost(Comments)
