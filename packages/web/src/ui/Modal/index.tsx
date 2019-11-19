// @ts-nocheck
import { Base, Content, Close } from './styles'

export * from './ModalContext'
export * from './ModalProvider'
export * from './ModalRoot'
export * from './useModal'

export function Modal({ children, close, large = false }) {
  return (
    <Base>
      <Content large={large}>
        <Close onClick={close} />
        {children}
      </Content>
    </Base>
  )
}
