// @ts-nocheck
import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import SlidingPanel from 'react-sliding-side-panel'
import useClickOutside from '../../utils/useClickOutside'

const Base = styled.div``

const Close = styled.button`
  background: none;
  border: 0;
  margin: 20px 0 0 20px;
`

const Inner = styled.div`
  margin: 20px;
  margin-top: 50px;
`

const Button = styled.button`
  background: none;
  border: 0;
  margin-left: 15px;
`

const Action = styled.button`
  background: none;
  border: 0;
  margin: 5px;
`

const Menu = styled.nav`
  padding: 20px;
  background: white;
  right: 0;
  margin-right: 10px;
  margin-top: 10px;
  position: absolute;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 4px 10px 0px;
`

function Actions({ component }) {
  const ref = useRef()
  const [isOpen, setOpen] = useState(false)
  const [openPanel, setOpenPanel] = useState(false)

  useClickOutside(ref, () => setOpen(false))

  const handleToggle = () => setOpen(!isOpen)

  return (
    <Base ref={ref}>
      <Button onClick={handleToggle}>
        <img src={require('./dots.svg')} style={{ width: 25, marginTop: -10 }} />
      </Button>

      {isOpen && (
        <Menu>
          <Action
            onClick={() => {
              document.body.style.overflow = 'hidden'
              setOpenPanel(true)
            }}
          >
            Edit
          </Action>
          <Action style={{ color: '#ec6d2f' }} onClick={() => alert()}>
            Delete
          </Action>
        </Menu>
      )}

      <SlidingPanel type="right" isOpen={openPanel} size={30}>
        <div style={{ background: 'white', height: '100%' }}>
          <Close
            onClick={() => {
              document.body.style.overflow = ''
              setOpenPanel(false)
            }}
          >
            <img src={require('./close.svg')} />
          </Close>
          <Inner>{component}</Inner>
        </div>
      </SlidingPanel>
    </Base>
  )
}

export default Actions
