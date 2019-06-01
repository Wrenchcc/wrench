import React, { useState, useCallback } from 'react'
import { Keyboard } from 'react-native'
import { useTranslation } from 'react-i18next'
import { Query } from 'react-apollo'
import { showMention, dismissMention } from 'navigation'
import { CurrentUserQuery } from 'graphql/queries/user/getCurrentUser'
import { addComment } from 'graphql/mutations/comment/addComment'
import { Avatar, Text } from 'ui'
import { COLORS } from 'ui/constants'
import { Base, Input, Button } from './styles'

const PATTERN = '\\@[a-z0-9_-]+|\\@'
const TRIGGER = '@'
const EMPTY = ' '

function CommentField({ addComment, postId }) {
  const { t } = useTranslation()
  const [text, setText] = useState('')
  const [isTracking, setTracking] = useState(false)

  const handleOnChangeText = useCallback(
    text => {
      setText(text)

      const lastChar = text.substr(text.length - 1)

      if (lastChar === TRIGGER) {
        setTracking(true)
        showMention()
      } else if ((lastChar === EMPTY && isTracking) || text === '') {
        setTracking(false)
        dismissMention()
      }

      if (isTracking) {
        const pattern = new RegExp(PATTERN, 'gi')
        const keywordArray = text.match(pattern)
        if (keywordArray && !!keywordArray.length) {
          const lastKeyword = keywordArray[keywordArray.length - 1]
          showMention({ query: lastKeyword.replace(TRIGGER, '') })
        }
      }
    },
    [text, isTracking]
  )

  const handleSubmit = useCallback(() => {
    addComment(postId, text)
    setText('')
    Keyboard.dismiss()
  }, [])

  return (
    <Query query={CurrentUserQuery}>
      {({ data, loading }) => {
        if (loading) return null

        return (
          <Base>
            <Avatar uri={data && data.user.avatarUrl} />
            <Input
              placeholder={t('CommentField:placeholder')}
              placeholderTextColor={COLORS.LIGHT_GREY}
              keyboardType="twitter"
              onSubmitEditing={text.length > 0}
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
