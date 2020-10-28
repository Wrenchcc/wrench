// @ts-nocheck
import React, { useState, useRef } from 'react'
import { useTranslation } from 'i18n'
import { useClickOutside } from 'hooks'
import Result from './Result'
import { Base, Field, Icon } from './styles'

function Search({ className, inverted }) {
  const { t } = useTranslation('search')
  const ref = useRef()

  const [value, setValue] = useState('')
  const [active, setActive] = useState(false)

  const onChange = evt => {
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
    <Base className={className} active={active} ref={ref}>
      <Icon src={require('./search.svg')} />
      <Field
        inverted={inverted}
        placeholder={t('placeholder')}
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
