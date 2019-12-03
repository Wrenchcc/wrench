import styled from 'styled-components'

export const DOT_SIZE = 8
export const DOT_SPACE = 7
export const PAGINATION_WIDTH = 4 * (DOT_SIZE + DOT_SPACE)

export const DotBase = styled.View`
  flex: 1;
  position: absolute;
  z-index: 10;
  bottom: 20;
  left: 50%;
  margin-left: -${PAGINATION_WIDTH / 2};
  width: ${PAGINATION_WIDTH};
  overflow: hidden;
  border-radius: 20;
`

export const Dot = styled.View`
  width: ${DOT_SIZE};
  height: ${DOT_SIZE};
  border-radius: ${DOT_SIZE};
  border-width: 1.5;
  border-color: white;
  margin-left: 3.5;
  margin-right: 3.5;
  background: ${props => (props.active ? 'white' : 'transparent')};
`
