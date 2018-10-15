import React, { Fragment } from 'react'
import { StatusBar } from 'react-native'
import { Subscribe } from 'unstated'
import { withNamespaces } from 'react-i18next'
import { logo } from 'images'
import video from 'videos/splash.mp4'
import { AppContainer } from 'state'
import Facebook from '../../components/Facebook'
import { Base, Inner, Content, Video, Icon, Description, Headline, Legal } from './styles'

const SignIn = ({ t }) => (
  <Fragment>
    <StatusBar barStyle="light-content" />

    <Subscribe to={[AppContainer]}>
      {({ changeLoginState }) => (
        <Base>
          <Video source={video} muted resizeMode="cover" repeat paused={__DEV__} />
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
            <Facebook changeLoginState={changeLoginState} />
            <Legal />
          </Inner>
        </Base>
      )}
    </Subscribe>
  </Fragment>
)

export default withNamespaces('SignIn')(SignIn)
