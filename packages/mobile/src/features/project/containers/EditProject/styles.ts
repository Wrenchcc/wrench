import styled from 'styled-components'

export const Inner = styled.View`
  padding-bottom: 40;
`

export const Spacing = styled.View`
  padding-bottom: ${props => (props.large ? 20 : 10)};
`
