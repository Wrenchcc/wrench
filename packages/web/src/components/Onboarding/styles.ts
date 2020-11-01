// @ts-nocheck
import styled from 'styled-components'
import UiImage from 'ui/Image'
import UiTitle from 'ui/Title'
import { FONTS, DEVICE } from 'ui/constants'

export const Base = styled.div`
  position: absolute;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Inner = styled.div`
  width: 640px;
  height: 85%;
  background: black;
  padding: 50px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  position: relative;

  @media ${DEVICE.TABLET} {
    height: 100%;
    width: 100%;
  }
`

export const Scroll = styled.div`
  overflow-y: scroll;
  margin-top: 40px;
  margin-bottom: 40px;

  &::-webkit-scrollbar {
    display: none;
  }
`

export const Types = styled.div`
  column-count: 3;
  column-gap: 10px;

  @media ${DEVICE.TABLET} {
    column-count: 2;
  }
`

export const Image = styled(UiImage)`
  background: transparent;
  height: ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  border: 3px solid ${(props) => (props.selected ? props.theme.colors.default : 'transparent')};
  box-sizing: border-box;

  @media ${DEVICE.TABLET} {
    height: 50%;
    width: 50%;
  }
`

export const Title = styled(UiTitle)`
  margin-bottom: 15px;
`

export const Next = styled.button`
  font-weight: ${FONTS.MEDIUM};
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
  border: none;
  color: white;
  font-size: 15px;
  opacity: ${(props) => props.opacity};
`

export const Picture = styled.div`
  cursor: pointer;
  position: relative;
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  padding-top: 10px;

  @media ${DEVICE.TABLET} {
    height: 50%;
    width: 50%;
  }
`

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(000, 000, 000, 0.2);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  padding: 10px;
  box-sizing: border-box;
`
