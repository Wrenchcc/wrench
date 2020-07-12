import styled from 'styled-components'
import UiInput from 'ui/Input'

export const Inner = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 15px;
`

export const Input = styled(UiInput)`
  flex: 1;
  border-bottom-width: 0px;
  padding-right: 10px;
  padding-left: 10px;
  font-size: 15px;
`
