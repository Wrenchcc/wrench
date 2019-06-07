import React, { useState, useCallback, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Query } from 'react-apollo'
import { CurrentUserQuery } from 'graphql/queries/user/getCurrentUser'
import { addComment } from 'graphql/mutations/comment/addComment'
import { Avatar, Text } from 'ui'
import { COLORS } from 'ui/constants'
import { MENTION } from './constants'
import { Base, Input, Button } from './styles'

function CommentField({ addComment: addCommentMutation, postId, commentId, username }) {
  const inputRef = useRef()
  const { t } = useTranslation()
  const [text, setText] = useState('')
  const [isTracking, setTracking] = useState(false)

  // When selecting user from outside
  useEffect(() => {
    if (username) {
      setText(`${MENTION.TRIGGER}${username} `)
      inputRef.current.focus()
    }
  }, [inputRef, username, commentId])

  const handleOnChangeText = useCallback(
    val => {
      setText(val)

      // const lastChar = val.substr(val.length - 1)
      //
      // if (lastChar === MENTION.TRIGGER) {
      //   setTracking(true)
      //
      //   showMention({
      //     onPress: user => {
      //       dismissMention()
      //       setText(`${MENTION.TRIGGER}${user.username} `)
      //     },
      //   })
      // } else if ((lastChar === MENTION.EMPTY && isTracking) || val === '') {
      //   setTracking(false)
      //   dismissMention()
      // }

      // if (isTracking) {
      //   const pattern = new RegExp(MENTION.PATTERN, 'gi')
      //   const keywordArray = val.match(pattern)
      //
      //   if (keywordArray) {
      // const lastKeyword = keywordArray[keywordArray.length - 1].replace(MENTION.TRIGGER, '')
      // const comment = val.slice(0, -lastKeyword.length - 1)
      // console.log(comment)
      // setText(comment)
      // this.props.onMention(lastKeyword.replace(TRIGGER, ''))
      // this.props.openMention()
      // }
      // }
    },
    [isTracking]
  )

  const handleSubmit = useCallback(() => {
    // addCommentMutation(postId, text, commentId)
    inputRef.current.blur()
  }, [postId, text, commentId, inputRef])

  return (
    <Query query={CurrentUserQuery}>
      {({ data, loading }) => {
        if (loading) {
          return null
        }

        return (
          <Base>
            <Avatar uri={data && data.user.avatarUrl} />
            <Input
              ref={inputRef}
              onSubmitEditing={(text.length > 0 && handleSubmit) || null}
              placeholder={t('CommentField:placeholder')}
              placeholderTextColor={COLORS.LIGHT_GREY}
              keyboardType="twitter"
              onChangeText={handleOnChangeText}
              value={text}
              color="dark"
            />
            {text.length > 0 && (
              <Button onPress={handleSubmit} hapticFeedback="impactLight">
                <Text fontSize={15} medium>
                  {t('CommentField:post')}
                </Text>
              </Button>
            )}
          </Base>
        )
      }}
    </Query>
  )
}

export default addComment(CommentField)
