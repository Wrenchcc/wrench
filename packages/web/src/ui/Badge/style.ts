import styled from 'styled-components'

export const Base = styled.div`
  cursor: pointer;
  position: relative;
  width: 19px;
  height: 19px;

  &:before {
    content: '';
    position: absolute;
    top: -5px;
    right: -4px;
    border-radius: 8px;
    width: 8px;
    height: 8px;
    border: solid 3px #ffffff;
    background-color: #f68a56;
  }
`

export const Icon = styled.img`
  width: 100%;
  height: 100%;
`
