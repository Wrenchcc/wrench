import AsyncStorage from '@react-native-community/async-storage'
import { logError } from 'utils/sentry'

export default {
  async getItem(key) {
    try {
      return JSON.parse(await AsyncStorage.getItem(key))
    } catch (error) {
      logError(`Error when getting item for key ${key}`, error)
      return null
    }
  },
  async setItem(key, value) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      logError(`Error when setting item ${value} for key ${key}`, error)
    }
  },
  async removeItem(key) {
    try {
      await AsyncStorage.removeItem(key)
    } catch (error) {
      logError(`Error when removing item for key ${key}`, error)
    }
  },
}
