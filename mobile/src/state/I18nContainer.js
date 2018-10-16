import { Container } from 'unstated'
import i18next from 'i18next'
import { setLocale, languages } from 'i18n'
import { track, events, logError } from 'utils/analytics'

export default class I18nContainer extends Container {
  state = {
    currentLanguage: i18next.language,
    supportedLanguages: languages,
  }

  changeLanguage = async language => {
    try {
      await setLocale(language)
    } catch (err) {
      logError(err)
    }

    i18next.changeLanguage(language)
    this.setState({ currentLanguage: language }, () => {
      track(events.USER_CHANGED_LANGUAGE, { language })
    })
  }
}
