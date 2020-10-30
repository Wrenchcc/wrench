// @ts-nocheck
import styled from 'styled-components'

export const Base = styled.div`
  input:checked + label > span {
    transform: translateX(100%);
    left: calc(100% - 52px);
  }
`

export const Check = styled.input`
  height: 0;
  width: 0;
  visibility: hidden;
`

export const Label = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  width: 50px;
  height: 30px;
  background: grey;
  border-radius: 30px;
  position: relative;
  transition: background-color 0.2s;
  background: ${(props) =>
    props.selected ? props.theme.colors.inverse : props.theme.colors.neutral};
`

export const Circle = styled.span`
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 25px;
  height: 25px;
  border-radius: 25px;
  transition: 0.2s;
  background: ${(props) => props.theme.colors.default};
  box-shadow: 0 0 2px 0 rgba(10, 10, 10, 0.29);
`
