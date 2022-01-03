// @ts-nocheck
import React, { useState, useRef } from 'react'
import useClickOutside from '../../utils/useClickOutside'
import Result from './Result'
import { Base, Field, SearchIcon } from './styles'

function Search() {
  const ref = useRef()

  const [value, setValue] = useState('')
  const [active, setActive] = useState(false)

  const onChange = (evt) => {
    setValue(evt.target.value)
  }

  const handleCloseAndReset = () => {
    setValue('')
    setActive(false)
  }

  useClickOutside(ref, () => setActive(false))

  const toggleActive = () => {
    setTimeout(() => {
      setActive(!active)
    }, 100)
  }

  return (
    <Base active={active} ref={ref}>
      <SearchIcon />
      <Field
        placeholder="Search"
        type="search"
        value={value}
        onFocus={toggleActive}
        onChange={onChange}
      />

      {value && active && <Result query={value} onPress={handleCloseAndReset} />}
    </Base>
  )
}

export default Search
