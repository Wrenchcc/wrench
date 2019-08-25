import styled from 'styled-components'
import { Transitioning } from 'react-native-reanimated'
import UiText from 'ui/Text'
import UiIcon from 'ui/Icon'
import { FONTS, COLORS } from 'ui/constants'

export const Base = styled(Transitioning.View)`
  flex-direction: row;
  align-items: center;
  flex: 1;
`

export const Inner = styled.View`
  flex: 1;
  height: 40;
`

export const Text = styled(UiText)`
  padding-left: 41;
  font-size: 17;
`

export const Input = styled.TextInput`
  flex: 1;
  position: relative;
  background-color: ${COLORS.ULTRA_LIGHT_GREY};
  font-size: 17;
  font-family: ${FONTS.REGULAR};
  border-radius: 1;
  padding-left: 41;
  padding-bottom: 0;
  padding-top: 0;
`

export const SearchIcon = styled(UiIcon)`
  position: absolute;
  left: 20;
  top: 12;
  width: 14;
  height: 14;
`

export const CloseIcon = styled(UiIcon)`
  position: absolute;
  right: 20;
  top: 14;
`
