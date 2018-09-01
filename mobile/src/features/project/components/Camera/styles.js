import styled from 'styled-components'
import { isIphoneX } from 'utils/platform'
import UiTouchable from 'ui/Touchable'
import UiTitle from 'ui/Title'
import UiText from 'ui/Text'
import { COLORS } from 'ui/constants'

export const Base = styled.TouchableWithoutFeedback`
  flex: 1;
`

export const Inner = styled.View`
  flex: 1;
  justify-content: center;
  padding-left: 40;
  padding-right: 40;
`

export const Headline = styled(UiTitle)`
  margin-bottom: 10px;
`

export const Description = styled(UiText)`
  margin-bottom: 30px;
`

export const Content = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: flex-end;
`

export const Bottom = styled.View`
  flex: 1;
  flex-direction: row;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: ${isIphoneX ? 40 : 20};
`

export const TakePicture = styled(UiTouchable)`
  justify-content: center;
  align-self: center;
  width: 80;
  height: 80;
  border-width: 3;
  border-color: ${COLORS.WHITE};
  border-radius: 80;
`
