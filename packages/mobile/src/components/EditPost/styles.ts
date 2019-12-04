import styled from 'styled-components'
import { FONTS } from 'ui/constants'
import UiInput from 'ui/Input'

export const Content = styled.View`
  padding-top: 10px;
  margin-right: 20px;
  margin-left: 20px;
`

export const Input = styled(UiInput)`
  font-size: 15px;
  line-height: 22px;
  font-family: ${FONTS.REGULAR};
  padding-top: 0px;
  padding-bottom: 0px;
  margin-top: -2px;
`
