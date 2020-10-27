// @ts-nocheck
import React, { useContext } from 'react'
import { useTranslation, i18n } from 'i18n'
import { I18nContext } from 'next-i18next'
import Router from 'next/router'
import { SUPPORTED_LOCALS } from 'i18n'
import { useCookie, Cookies } from 'hooks'
import { Icon } from 'ui'
import { Base, Select } from './styles'

function LanguageSelector() {
  const { t } = useTranslation('Settings')
  const {
    i18n: { language },
  } = useContext(I18nContext)

  const handleChange = (evt) => {
    i18n.changeLanguage(evt.target.value).then(e => console.log(e))
  }

  return (
    <Base>
      <Select onChange={handleChange}>
        {SUPPORTED_LOCALS.map((locale) => {
          return (
            <option key={locale} selected={language === locale} value={locale}>
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
