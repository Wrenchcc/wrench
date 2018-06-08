import styled from 'styled-components'
import isIphoneX from 'utils/isIphoneX'
import UiTouchable from 'ui/Touchable'
import { COLORS } from 'ui/constants'

export const Base = styled.TouchableWithoutFeedback`
  flex: 1;
`

export const Content = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: flex-end;
`

export const Bottom = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: ${isIphoneX() ? 40 : 20};
`

export const TakePicture = styled(UiTouchable)`
  width: 80;
  height: 80;
  border-width: 3;
  border-color: ${COLORS.WHITE};
  border-radius: 80;
  margin-left: -20px;
`
