import NextI18NextInstance from '../../i18n'

export const SUPPORTED_LOCALS = ['en', 'sv']

export default NextI18NextInstance

export const i18n = NextI18NextInstance.i18n

export const { appWithTranslation, useTranslation } = NextI18NextInstance
