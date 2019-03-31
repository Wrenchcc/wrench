import { Container } from 'unstated'
import i18next from 'i18next'
import { setLocale, languages, updateUserLanguage } from 'i18n'
import { track, events } from 'utils/analytics'
import { logError } from 'utils/sentry'

export default class I18nContainer extends Container {
  state = {
    currentLocale: i18next.language,
    availableLocales: languages,
  }

  changeLocale = async locale => {
    try {
      await setLocale(locale)
    } catch (err) {
      logError(err)
    }

    i18next.changeLanguage(locale)
    updateUserLanguage(locale)

    this.setState({ currentLocale: locale }, () => {
      track(events.USER_CHANGED_LOCALE, { locale })
    })
  }
}
