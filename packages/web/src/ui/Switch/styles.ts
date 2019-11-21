// @ts-nocheck
import styled from 'styled-components'

// .react-switch-checkbox {
//   height: 0;
//   width: 0;
//   visibility: hidden;
// }

// .react-switch-label {
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   cursor: pointer;
//   width: 100px;
//   height: 50px;
//   background: grey;
//   border-radius: 100px;
//   position: relative;
//   transition: background-color .2s;
// }

// .react-switch-label .react-switch-button {
//   content: '';
//   position: absolute;
//   top: 2px;
//   left: 2px;
//   width: 45px;
//   height: 45px;
//   border-radius: 45px;
//   transition: 0.2s;
//   background: #fff;
//   box-shadow: 0 0 2px 0 rgba(10, 10, 10, 0.29);
// }

// .react-switch-checkbox:checked + .react-switch-label .react-switch-button {
// left: calc(100% - 2px);
// transform: translateX(-100%);
// }

// .react-switch-label:active .react-switch-button {
//   width: 60px;
// }

export const Base = styled.div`
  input:checked + label > span {
    transform: translateX(100%);
    left: calc(100% - 52px);
  }
`

export const Blah1 = styled.input`
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
  background: #fff;
  box-shadow: 0 0 2px 0 rgba(10, 10, 10, 0.29);
`
