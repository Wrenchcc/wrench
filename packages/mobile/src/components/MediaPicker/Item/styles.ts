import styled from 'styled-components'

export const Marker = styled.View`
  width: 24px;
  height: 24px;
  position: absolute;
  right: 5px;
  top: 5px;
  border-radius: 24px;
  background-color: ${props =>
    props.selected ? props.theme.colors.white : 'rgba(255, 255, 255, 0.25)'};
  border-style: solid;
  border-width: 1.5px;
  border-color: ${props => props.theme.colors.white};
  z-index: 10;
  justify-content: center;
  align-items: center;
`

export const Overlay = styled.View`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0px;
  top: 0px;
  background-color: ${props => (props.selected ? 'rgba(000, 000, 000, 0.25)' : 'transparent')};
`
