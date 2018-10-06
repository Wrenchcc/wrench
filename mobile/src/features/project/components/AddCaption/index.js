import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { KeyboardAvoidingView } from 'react-native'
import { translate } from 'react-i18next'
import { Input } from 'ui'
import { Edit, Inner, Overlay } from './styles'

class AddCaption extends PureComponent {
  static propTypes = {
    caption: PropTypes.string.isRequired,
    isEditing: PropTypes.bool.isRequired,
    onChangeCaption: PropTypes.func.isRequired,
  }

  render() {
    const { t, isEditing, caption, onChangeCaption } = this.props

    if (!isEditing) return null

    return (
      <Overlay>
        <Inner>
          <KeyboardAvoidingView behavior="position">
            <Edit>
              <Input
                autoFocus
                multiline
                selectionColor="white"
                value={caption}
                onChangeText={onChangeCaption}
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
