import React from 'react'
import { Keyboard } from 'react-native'
import { useTranslation } from 'react-i18next'
import { Avatar, Text } from 'ui/Avatar'
import { COLORS } from 'ui/constants'
import { Base, Input, Button } from './styles'

function CommentField() {
  const { t } = useTranslation()

  return (
    <Base>
      <Avatar uri={data && data.user.avatarUrl} />
      <Input
        placeholder={t('CommentField:placeholder')}
        placeholderTextColor={COLORS.LIGHT_GREY}
        keyboardType="twitter"
        onSubmitEditing={(!this.props.value.length === 0 && this.onSubmitEditing) || null}
        onChangeText={this.onChangeText}
        value={this.props.value}
        color="dark"
      />
      {!disabled && (
        <Button onPress={this.handleSubmit} hapticFeedback="impactLight">
          <Text fontSize={15} medium>
            {t('CommentField:post')}
          </Text>
        </Button>
      )}
    </Base>
  )
}

export default CommentField
