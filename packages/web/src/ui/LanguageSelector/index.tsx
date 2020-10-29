// @ts-nocheck
import React, { useContext } from 'react'
import { locales } from '@wrench/translations'
import { useTranslation, i18n } from 'i18n'
import { I18nContext } from 'next-i18next'
import Router from 'next/router'
import { useCookie, Cookies } from 'hooks'
import { Icon } from 'ui'
import { Base, Select, Inner } from './styles'

function LanguageSelector() {
  const { t } = useTranslation('languages')
  const {
    i18n: { language },
  } = useContext(I18nContext)

  const handleChange = (evt) => {
    i18n.changeLanguage(evt.target.value)
  }

  return (
    <Base>
      <Inner>
        <Select onChange={handleChange}>
          {locales.map((locale) => {
            return (
              <option key={locale} selected={language === locale} value={locale}>
                {t(locale)}
              </option>
            )
          })}
        </Select>

        {/* <Icon
        source={require('./arrowDown.svg?include')}
        noFill
        style={{ position: 'absolute', right: 20, top: 10, pointerEvents: 'none' }}
      /> */}
      </Inner>
    </Base>
  )
}

export default LanguageSelector
