import styled from 'styled-components'

export const Base = styled.div`
  padding-top: 80px;
  max-width: 1060px;
  margin: 0 auto;
`

export const Inner = styled.div`
  display: flex;
  flex-direction: ${props => (props.column ? 'column' : 'row')};
`
