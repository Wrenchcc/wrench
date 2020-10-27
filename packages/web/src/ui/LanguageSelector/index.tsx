// @ts-nocheck
import React from 'react'
import { useTranslation } from 'i18n'
import Router from 'next/router'
import { SUPPORTED_LOCALS } from 'i18n'
import { useCookie, Cookies } from 'hooks'
import { Icon } from 'ui'
import { Base, Select } from './styles'

function LanguageSelector() {
  const { t } = useTranslation('Settings')
  const [selectedLanguage, setValue] = useCookie(Cookies.PREFERRED_LANGUAGE)

  const handleChange = (evt) => {
    setValue(evt.target.value)
    Router.reload(window.location.pathname)
  }

  return (
    <Base>
      <Select onChange={handleChange}>
        {SUPPORTED_LOCALS.map((locale) => {
          return (
            <option key={locale} selected={selectedLanguage === locale} value={locale}>
              {t(`languages.${locale}`)}
            </option>
          )
        })}
      </Select>

      <Icon
        source={require('./arrowDown.svg?include')}
        noFill
        style={{ position: 'absolute', right: 20, top: 10 }}
      />
    </Base>
  )
}

export default LanguageSelector
