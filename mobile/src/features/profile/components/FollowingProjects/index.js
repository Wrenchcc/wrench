import React, { PureComponent } from 'react'
import { translate } from 'react-i18next'
import { Base, Title, Description } from './styles'

class FollowingProjects extends PureComponent {
  render() {
    const { t } = this.props

    return (
      <Base>
        <Title>{t('FollowingProjects:title')}</Title>
        <Description>{t('FollowingProjects:description')}</Description>
      </Base>
    )
  }
}

export default translate('FollowingProjects')(FollowingProjects)
