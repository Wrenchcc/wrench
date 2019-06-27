import React, { memo, useState, useCallback, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Query } from 'react-apollo'
import { showMention, dismissMention } from 'navigation'
import { CurrentUserQuery } from 'graphql/queries/user/getCurrentUser'
import { addComment } from 'graphql/mutations/comment/addComment'
import { Avatar, Text } from 'ui'
import { COLORS } from 'ui/constants'
import { MENTION } from './constants'
import { Base, Input, Button } from './styles'

function CommentField({ addComment: addCommentMutation, postId, commentId, username }) {
  const { t } = useTranslation()
  const inputRef = useRef()
  const [text, setText] = useState('')

  // When selecting user from outside
  useEffect(() => {
    if (username) {
      setText(`${MENTION.TRIGGER}${username} `)
      inputRef.current.focus()
    }
  }, [inputRef, username, commentId])

  const handleOnChangeText = useCallback(val => {
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
  }, [])

  const handleSubmit = useCallback(() => {
    addCommentMutation(postId, text, commentId)
    setText('')
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
              <Button onPress={handleSubmit}>
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

export default memo(addComment(CommentField))
