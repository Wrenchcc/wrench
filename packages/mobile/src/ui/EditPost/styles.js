import styled from 'styled-components'
import { FONTS } from 'ui/constants'
import UiInput from 'ui/Input'

export const Input = styled(UiInput)`
  font-size: 15;
  line-height: 22;
  font-family: ${FONTS.REGULAR};
  text-align: left;
  padding-top: 0;
  padding-bottom: 0;
  margin-top: -2;
`
