import styled from 'styled-components'

export const Base = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 40;
  margin-bottom: 50;
  padding-left: ${props => (props.paddingHorizontal ? 20 : 0)};
  padding-right: ${props => (props.paddingHorizontal ? 20 : 0)};
`

export const Username = styled.View``
