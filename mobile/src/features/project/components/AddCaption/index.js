import React, { PureComponent } from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { translate } from 'react-i18next'
import { Input } from 'ui'
import { Edit, Inner, Overlay } from './styles'

class AddCaption extends PureComponent {
  state = {
    caption: false,
  }

  onChangeText = () => {}

  render() {
    const { t, isEditing } = this.props

    if (!isEditing) return null

    return (
      <Overlay>
        <Inner onPressIn={() => console.log('close dropdown')} activeOpacity={1}>
          <KeyboardAvoidingView behavior="position">
            <Edit>
              <Input
                autoFocus
                multiline
                selectionColor="white"
                value={this.state.caption}
                onChangeText={this.onChangeText}
                placeholder={t('AddPost:placeholder')}
              />
            </Edit>
          </KeyboardAvoidingView>
        </Inner>
      </Overlay>
    )
  }
}

export default translate('AddCaption')(AddCaption)
