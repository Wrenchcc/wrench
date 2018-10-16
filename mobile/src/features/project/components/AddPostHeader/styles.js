import styled from 'styled-components'

export const Top = styled.View`
  position: relative;
  z-index: 20;
`

export const Backdrop = styled.TouchableOpacity`
  width: 100%;
  height: ${props => (props.active ? '100%' : 0)};
  position: absolute
  z-Index: 5;
  `
