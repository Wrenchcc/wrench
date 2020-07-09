import styled from 'styled-components/native'

export const DOT_SIZE = 8
export const DOT_SPACE = 7
export const PAGINATION_WIDTH = 4 * (DOT_SIZE + DOT_SPACE)

export const DotBase = styled.View`
  flex: 1;
  position: absolute;
  z-index: 10;
  bottom: 20px;
  left: 50%;
  margin-left: -${PAGINATION_WIDTH / 2}px;
  width: ${PAGINATION_WIDTH}px;
  overflow: hidden;
  border-radius: 20px;
`

type DotProps = {
  active?: boolean
}

export const Dot = styled.View<DotProps>`
  width: ${DOT_SIZE}px;
  height: ${DOT_SIZE}px;
  border-radius: ${DOT_SIZE}px;
  border-width: 1.5px;
  border-color: white;
  margin-left: 3.5px;
  margin-right: 3.5px;
  background: ${(props) => (props.active ? 'white' : 'transparent')};
`
