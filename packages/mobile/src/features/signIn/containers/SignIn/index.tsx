import React from 'react'
import { useTranslation } from 'react-i18next'
import { logo } from 'images'
import video from 'videos/splash.mp4'
import Facebook from '../../components/Facebook'
import { Base, Inner, Content, Video, Icon, Description, Headline, Legal, Overlay } from './styles'

function SignIn() {
  const { t } = useTranslation()

  return (
    <Base>
      <Video source={video} muted resizeMode="cover" />
      <Overlay />
      <Inner>
        <Icon source={logo} />

        <Content>
          <Headline large numberOfLines={0}>
            {t('SignIn:headline')}
          </Headline>
          <Description white fontSize={20}>
            {t('SignIn:description')}
          </Description>
        </Content>
        <Facebook />
        <Legal />
      </Inner>
    </Base>
  )
}

export default SignIn
