// @ts-nocheck
import { Base, Content, CloseIcon } from './styles'

export * from './ModalContext'
export * from './ModalProvider'
export * from './ModalRoot'
export * from './useModal'

export function Modal({ children, close, large = false }) {
  return (
    <Base>
      <Content large={large}>
        <CloseIcon onClick={close} />
        {children}
      </Content>
    </Base>
  )
}
