import styled from 'styled-components'

export const Base = styled.div`
  display: flex;
  flex-direction: ${props => (props.column ? 'column' : 'row')};
  padding-top: 100px;
  max-width: 1000px;
  margin: 0 auto;
`
