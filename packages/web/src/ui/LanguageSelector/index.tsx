// @ts-nocheck
import React, { useContext } from 'react'
import { locales } from '@wrench/translations'
import { ArrowDownIcon } from '@wrench/ui'
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

        <ArrowDownIcon
          style={{ position: 'absolute', right: 20, top: 13, pointerEvents: 'none' }}
          width={12}
          height={16}
        />
      </Inner>
    </Base>
  )
}

export default LanguageSelector
