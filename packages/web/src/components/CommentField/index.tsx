// @ts-nocheck
import React, { memo, useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'i18n'
import { Mention, MentionsInput } from 'react-mentions'
import { prepend, append } from 'ramda'
import { useAddCommentMutation, useCurrentUserQuery, useSearchUsersLazyQuery } from '@wrench/common'
import { Avatar, Text } from 'ui'
import { COLORS } from 'ui/constants'
import { useCookie, Cookies } from 'hooks'
import { useModal, Modal } from 'ui/Modal'
import Login from 'components/Login'
import { Base, Inner, Button, Username } from './styles'
import { useRouter } from 'next/router'

const DEFAULT_AVATAR_URL = 'https://edge-files.wrench.cc/avatar/default.jpg'

const styles = {
  width: '100%',
  display: 'flex',
  padding: 0,

  suggestions: {
    top: 20,
    left: 0,
    width: 375,
    boxShadow: '0 4px 10px 0 rgba(0, 0, 0, 0.11)',
    backgroundColor: 'white',

    list: {
      backgroundColor: 'white',
      border: 'none',
      fontSize: 16,
      color: 'black',
      position: 'absolute',
      width: 375,
      maxHeight: 368,
      overflow: 'auto',
    },

    item: {
      padding: '0 20px',
      boxSizing: 'border-box',
      height: 70,
      borderBottom: '1px solid rgba(0,0,0,0.15)',

      '&focused': {
        backgroundColor: '#e6e7e9',
      },
    },
  },

  input: {
    border: 0,
    width: '100%',
    outline: 'none',
    fontSize: 16,
    color: COLORS.DARK,
    marginLeft: 10,
    display: 'flex',
    padding: 0,
    top: -6,
    height: 30,
  },
}

const CommentField = React.forwardRef(({ postId, commentId, initialValue = '' }, ref) => {
  const { t } = useTranslation('comment-field')
  const router = useRouter()
  const [isAuthenticated] = useCookie(Cookies.ACCESS_TOKEN)
  const [text, setText] = useState('')

  const currentUser = useCurrentUserQuery({
    skip: !isAuthenticated,
  })

  const [searchUser, { data }] = useSearchUsersLazyQuery()
  const [addCommentMutation] = useAddCommentMutation()

  async function fetchUsers(query, callback) {
    if (!query) return

    searchUser({
      variables: {
        query,
        type: 'USERS',
      },
    })

    if (data) {
      callback(
        data.users.edges.map(({ node }) => ({
          id: node.id,
          display: node.username,
          avatarUrl: node.avatarUrl,
        }))
      )
    }
  }

  const renderItem = ({ id, display, avatarUrl }) => {
    return (
      <div
        key={id}
        style={{ display: 'flex', height: 70, flexDirection: 'row', alignItems: 'center' }}
      >
        <Avatar size={40} uri={avatarUrl} />
        <Username medium>{display}</Username>
      </div>
    )
  }

  useEffect(() => {
    setText(initialValue)
  }, [initialValue])

  const handleOnChangeText = useCallback(
    ({ target }) => {
      // TODO: Fix
      const text = target.value.replace('[', '').replace(']', '')
      setText(text)
    },
    [setText]
  )

  const handleSubmit = useCallback(() => {
    setText('')
  }, [postId, text, commentId])

  const [showModal, closeModal] = useModal(() => (
    <Modal close={closeModal}>
      <Login closeModal={closeModal} referral={router.asPath} />
    </Modal>
  ))

  const handleOnKeyDown = useCallback(
    evt => {
      if (evt.keyCode == 13 && evt.shiftKey == false) {
        evt.preventDefault()
        handleSubmit()
      }
    },
    [text]
  )

  const handleFocus = useCallback(() => {
    if (!isAuthenticated) {
      showModal()
    }
  }, [])

  return (
    <Base>
      <Inner>
        <Avatar uri={(currentUser.data && currentUser.data.user.avatarUrl) || DEFAULT_AVATAR_URL} />

        <MentionsInput
          style={styles}
          ref={ref}
          placeholder={t('placeholder')}
          onChange={handleOnChangeText}
          onFocus={handleFocus}
          value={text}
          onKeyDown={handleOnKeyDown}
          allowSpaceInQuery
          singleLine
        >
          <Mention
            appendSpaceOnAdd
            markup="@[__display__]"
            displayTransform={(_, display) => `@${display}`}
            trigger="@"
            data={fetchUsers}
            style={{ left: 0 }}
            renderSuggestion={renderItem}
          />
        </MentionsInput>

        {text.length > 0 && (
          <Button onClick={handleSubmit}>
            <Text fontSize={15} medium>
              {t('post')}
            </Text>
          </Button>
        )}
      </Inner>
    </Base>
  )
})

export default memo(CommentField)
