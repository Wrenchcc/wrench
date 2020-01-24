import React, { useState, useCallback, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Keyboard } from 'react-native'
import { useCurrentUserQuery } from '@wrench/common'
import { showMention, dismissMention } from 'navigation'
import { useMentionStore } from 'store'
import { Avatar, Text } from 'ui'
import { COLORS } from 'ui/constants'
import { isAndroid } from 'utils/platform'
import EmojiList from 'components/EmojiList'
import { MENTION } from './constants'
import { Base, Inner, Input, Button } from './styles'

const KEYBOARD_EVENT_LISTENER = isAndroid ? 'keyboardDidHide' : 'keyboardWillHide'

function CommentField({ commentId, username, emoji, onSubmit, blurOnSubmit }) {
  const { t } = useTranslation()
  const inputRef = useRef()
  const isTracking = useRef(false)
  const [text, setText] = useState('')

  const { updateQuery, query } = useMentionStore(store => ({
    query: store.query,
    updateQuery: store.actions.updateQuery,
  }))

  const {
    data: { user },
  } = useCurrentUserQuery()

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
        isTracking.current = true

        showMention({
          onPress: user => {
            const comment = val.slice(0, -query.length - 1)
            setText(`${comment}@${user.username} `)
            isTracking.current = false
            dismissMention()
          },
        })
      } else if ((lastChar === MENTION.EMPTY && isTracking.current) || val === '') {
        isTracking.current = false
        dismissMention()
      }

      if (isTracking.current) {
        const pattern = new RegExp(MENTION.PATTERN, 'gi')
        const keywordArray = val.match(pattern)
        if (keywordArray && !!keywordArray.length) {
          const lastKeyword = keywordArray[keywordArray.length - 1]

          updateQuery(lastKeyword.replace(MENTION.TRIGGER, ''))

          showMention({
            onPress: user => {
              const comment = val.slice(0, -query.length - 1)
              setText(`${comment}@${user.username} `)
              isTracking.current = false
              dismissMention()
            },
          })
        }
      }
    },
    [showMention, dismissMention, setText, updateQuery, query]
  )

  const handleSubmit = useCallback(() => {
    if (blurOnSubmit) {
      inputRef.current.blur()
    }

    onSubmit(text)
    setText('')
  }, [inputRef, onSubmit, text, blurOnSubmit])

  const handleEmojiShortcut = useCallback(
    e => {
      const value = text.length > 0 ? `${text} ${e}` : e
      setText(value)
    },
    [setText, text]
  )

  return (
    <Base>
      {emoji && <EmojiList onPress={handleEmojiShortcut} />}

      <Inner>
        <Avatar
          uri={user && user.avatarUrl}
          fallback={user.isSilhouette}
          fullName={user.fullName}
        />
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
      </Inner>
    </Base>
  )
}

export default CommentField
