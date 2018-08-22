import React from 'react'
import withLocalization from 'i18n/withLocalization'
import { logo } from 'images'
import video from 'videos/splash.mp4'
import Facebook from '../../components/Facebook'
import { Base, Inner, Content, Video, Icon, Description, Headline, Legal } from './styles'

// TODO: Add AuthStateHandler Provider
const SignIn = ({ t, screenProps }) => (
  <Base>
    <Video source={video} muted resizeMode="cover" repeat paused={__DEV__} />
    <Inner>
      <Icon source={logo} />

      <Content>
        <Headline large numberOfLines={0}>
          {t('.headline')}
        </Headline>
        <Description white fontSize={20}>
          {t('.description')}
        </Description>
      </Content>
      <Facebook changeLoginState={screenProps.changeLoginState} />
      <Legal />
    </Inner>
  </Base>
)

export default withLocalization(SignIn, 'SignIn')
