import styled from 'styled-components'
import LinearGradient from 'react-native-linear-gradient'
import UiImage from 'ui/Image'
import UiTouchable from 'ui/Touchable'
import UiFollowers from 'ui/Followers'
import UiText from 'ui/Text'
import UiAvatar from 'ui/Avatar'
import { COLORS } from 'ui/constants'

const HEIGHT = 180

export const Base = styled(UiTouchable)`
  margin-top: 20;
  position: relative;
`

export const Overlay = styled(LinearGradient)`
  position: absolute;
  width: 100%;
  height: 100%;
`

export const ProjectName = styled(UiText)`
  margin-top: 10;
  margin-bottom: 3;
`

export const Picture = styled(UiImage)`
  height: ${HEIGHT};
`

export const Followers = styled(UiFollowers)``

export const Avatar = styled(UiAvatar)`
  border-width: 1.5;
  border-color: ${COLORS.WHITE};
  border-radius: 30;
  overflow: hidden;
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
`

export const Info = styled.View`
  justify-content: flex-end;
`
