import React, { memo, useState, useCallback, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { showMention, dismissMention } from 'navigation'
import { useQuery, CURRENT_USER_QUERY } from 'gql'
import { addComment } from 'graphql/mutations/comment/addComment'
import { Avatar, Text } from 'ui'
import { COLORS } from 'ui/constants'
import { isAndroid } from 'utils/platform'
import { MENTION } from './constants'
import { Base, Input, Button } from './styles'

const KEYBOARD_EVENT_LISTENER = isAndroid ? 'keyboardDidHide' : 'keyboardWillHide'

function CommentField({ addComment: addCommentMutation, postId, commentId, username }) {
  const { t } = useTranslation()
  const inputRef = useRef()
  const [text, setText] = useState('')

  const { data } = useQuery(CURRENT_USER_QUERY, {
    fetchPolicy: 'cache-only',
  })

  useEffect(() => {
    if (username) {
      setText(`${MENTION.TRIGGER}${username} `)
      inputRef.current.focus()
    }
  }, [inputRef, username, commentId])

  useEffect(() => {
    const keyboardHideEventListener = Keyboard.addListener(KEYBOARD_EVENT_LISTENER, dismissMention)
    return () => keyboardHideEventListener.remove()
  }, [])

  const handleOnChangeText = useCallback(
    val => {
      setText(val)

      const lastChar = val.substr(val.length - 1)

      if (lastChar === MENTION.TRIGGER) {
        showMention({
          onPress: user => {
            dismissMention()
            setText(`${MENTION.TRIGGER}${user.username} `)
          },
        })
      }
    },
    [showMention, dismissMention, setText]
  )

  const handleSubmit = useCallback(() => {
    inputRef.current.blur()
    addCommentMutation(postId, text, commentId)
    setText('')
  }, [postId, text, commentId, inputRef])

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
        <Button onPress={handleSubmit}>
          <Text fontSize={15} medium>
            {t('CommentField:post')}
          </Text>
        </Button>
      )}
    </Base>
  )
}

export default memo(addComment(CommentField))
