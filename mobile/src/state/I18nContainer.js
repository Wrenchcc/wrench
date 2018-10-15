import { Container } from 'unstated'
import { i18n } from 'react-i18next'
import { setLocale, languages } from 'i18n'
import { track, events, logError } from 'utils/analytics'

export default class I18nContainer extends Container {
  state = {
    currentLanguage: 'en',
    supportedLanguages: languages,
  }

  changeLanguage = async language => {
    try {
      await setLocale(language)
    } catch (err) {
      logError(err)
    }

    i18n.changeLanguage(language)
    track(events.USER_CHANGED_LANGUAGE, { language })
  }
}
