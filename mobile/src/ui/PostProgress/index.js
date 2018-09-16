import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import { Text } from 'ui'
import { Base, Cover, Content } from './styles'

class PostProgress extends PureComponent {
  static propTypes = {
    image: PropTypes.string,
    title: PropTypes.string,
  }

  render() {
    const { t, title, image, translateY } = this.props

    // if (!title || !image) return null

    return (
      <Base style={{ transform: [{ translateY }] }}>
        <Cover source={{ uri: image }} />

        <Content>
          <Text numberOfLines={1}>{title}</Text>
          <Text fontSize={15} color="grey">
            {t('PostProgress:description')}
          </Text>
        </Content>
      </Base>
    )
  }
}

export default translate('PostProgress')(PostProgress)
