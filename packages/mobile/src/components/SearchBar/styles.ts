import styled from 'styled-components'
import UiText from 'ui/Text'
import UiIcon from 'ui/Icon'
import { FONTS } from 'ui/constants'

export const Base = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
`

export const Inner = styled.View`
  flex: 1;
  height: 40px;
`

export const Text = styled(UiText)`
  padding-left: 41px;
  font-size: 17px;
`

export const Input = styled.TextInput`
  flex: 1;
  position: relative;
  background-color: ${props => props.theme.colors.placeholder};
  font-size: 17px;
  font-family: ${FONTS.REGULAR};
  border-radius: 1px;
  padding-left: 41px;
  padding-bottom: 0px;
  padding-top: 0px;
`

export const SearchIcon = styled(UiIcon)`
  position: absolute;
  left: 20px;
  top: 12px;
  width: 14px;
  height: 14px;
`

export const CloseIcon = styled(UiIcon)`
  position: absolute;
  right: 20px;
  top: 14px;
`
