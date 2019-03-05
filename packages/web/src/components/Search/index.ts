import React, { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import Result from './Result'
import { Base, Field, Icon } from './styles'

function Search({ className }) {
  const { t } = useTranslation()
  const inputRef = useRef()

  const [value, setValue] = useState('')
  const [active, setActive] = useState(false)

  const onChange = evt => {
    setValue(evt.target.value)
  }

  const toggleActive = () => {
    setTimeout(() => {
      setActive(!active)
    }, 100)
  }

  return (
    <Base className={className} active={active}>
      <Icon src={require('./search.svg')} />
      <Field
        placeholder={t('Search:placeholder')}
        type="search"
        value={value}
        ref={inputRef}
        onFocus={toggleActive}
        onBlur={toggleActive}
        onChange={onChange}
      />

      <Result query={value} active={value && active} />
    </Base>
  )
}

export default Search
