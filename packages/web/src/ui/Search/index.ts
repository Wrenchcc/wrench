import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { Base, Field, Icon } from './styles'

function Search({ className }) {
  const { t } = useTranslation()

  return (
    <Base className={className}>
      <Icon src={require('./search.svg')} />
      <Field placeholder={t('Search:placeholder')} type="search" />
    </Base>
  )
}

export default Search
