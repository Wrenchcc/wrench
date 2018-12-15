import styled from 'styled-components'
import LinearGradient from 'react-native-linear-gradient'
import UiTouchable from 'ui/Touchable'
import UiFollowers from 'ui/Followers'
import UiText from 'ui/Text'
import UiButton from 'ui/Button'

export const Base = styled(UiTouchable)`
  margin-top: 20;
  position: relative;
  height: 180;
`

export const Overlay = styled(LinearGradient)`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
`

export const ProjectName = styled(UiText)`
  margin-top: 10;
  margin-bottom: 3;
`

export const Followers = styled(UiFollowers)``

export const Button = styled(UiButton)`
  margin-bottom: 5;
`

export const Content = styled.View`
  position: absolute;
  flex: 1;
  width: 100%;
  height: 100%;
  padding: 10px;
  justify-content: space-between;
  flex-direction: row;
  align-items: flex-end;
  z-index: 2;
`

export const Info = styled.View`
  justify-content: flex-end;
`
