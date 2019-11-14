class GoogleAnalytics {
  private get isSDKAvailable() {
    if (typeof window === 'undefined') {
      return false
    }

    if (!window.gtag) {
      return false
    }

    return true
  }

  public pageView = (path: string) => {
    if (!this.isSDKAvailable) {
      if (process.env.ENV !== 'production') {
        console.warn('GA SDK not available')
      }
      return
    }

    // eslint-disable-next-line @typescript-eslint/camelcase
    window.gtag('config', process.env.GA_TRACKING_ID, { page_path: path })
  }

  public event = (action: string, category: string, label: string, value: string) => {
    if (!this.isSDKAvailable) {
      throw new Error('GA SDK not available')
    }

    window.gtag('event', action, {
      event_category: category, // eslint-disable-line @typescript-eslint/camelcase
      event_label: label, // eslint-disable-line @typescript-eslint/camelcase
      value,
    })
  }
}

export default new GoogleAnalytics()
