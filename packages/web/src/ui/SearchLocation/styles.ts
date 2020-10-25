// @ts-nocheck
import styled from 'styled-components'
import UiText from 'ui/Text'

export const Base = styled.div`
  position: relative;
`

export const Place = styled(UiText)`
  margin-bottom: 10px;
  cursor: pointer;
`

export const Dropdown = styled.ul`
  padding: 20px;
  width: 50%;
  max-height: 200px;
  overflow: auto;
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.11);
  background-color: ${props => props.theme.colors.default};
  position: absolute;
  z-index: 10;
`
