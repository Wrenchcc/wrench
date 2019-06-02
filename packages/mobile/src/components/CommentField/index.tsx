import React, { useState, useCallback, useRef, useEffect } from 'react'
import { Keyboard } from 'react-native'
import { useTranslation } from 'react-i18next'
import { Query } from 'react-apollo'
import { showMention, dismissMention } from 'navigation'
import { CurrentUserQuery } from 'graphql/queries/user/getCurrentUser'
import { addComment } from 'graphql/mutations/comment/addComment'
import { Avatar, Text } from 'ui'
import { COLORS } from 'ui/constants'
import { MENTION } from './constants'
import { Base, Input, Button } from './styles'

function CommentField({ addComment, postId, commentId, username }) {
  const inputRef = useRef()
  const { t } = useTranslation()
  const [isTracking, setTracking] = useState(false)
  const [text, setText] = useState('')

  // When selecting user
  useEffect(() => {
    if (username) {
      setText(`${MENTION.TRIGGER}${username} `)
      inputRef.current.focus()
    }
  }, [inputRef, username, commentId])

  const handleOnChangeText = useCallback(
    text => {
      setText(text)

      const lastChar = text.substr(text.length - 1)

      if (lastChar === MENTION.TRIGGER) {
        setTracking(true)
        showMention({
          query: '',
          onPress: user => {
            dismissMention()
            setText(`${MENTION.TRIGGER}${user.username} `)
          },
        })
      } else if ((lastChar === MENTION.EMPTY && isTracking) || text === '') {
        setTracking(false)
        dismissMention()
      }

      if (isTracking) {
        const pattern = new RegExp(MENTION.PATTERN, 'gi')
        const keywordArray = text.match(pattern)
        if (keywordArray && !!keywordArray.length) {
          const lastKeyword = keywordArray[keywordArray.length - 1]
          setText(lastKeyword.replace(MENTION.TRIGGER, ''))

          showMention({
            query: '',
            onPress: user => {
              dismissMention()
              setText(lastKeyword.replace(MENTION.TRIGGER, ''))
            },
          })
        }
      }
    },
    [text, isTracking]
  )

  const handleSubmit = useCallback(() => {
    // addComment(postId, text, commentId)
  }, [postId, text, commentId])

  return (
    <Query query={CurrentUserQuery}>
      {({ data, loading }) => {
        if (loading) return null

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
