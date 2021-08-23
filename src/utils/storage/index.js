import { LocalStorageConf } from '$constant';

const APP_KEY = LocalStorageConf.prefix || 'do';

export class LocalStorageUtils {
  setItem(key, value) {
    return localStorage.setItem(`${APP_KEY}_${key}`, JSON.stringify(value));
  }

  clearItem(key) {
    return localStorage.removeItem(`${APP_KEY}_${key}`);
  }

  getItem(key) {
    try {
      const data = JSON.parse(localStorage.getItem(`${APP_KEY}_${key}`));
      return data;
    } catch (e) {
      return {};
    }
  }
}

const localStorageUtils = typeof localStorage !== 'undefined' ? new LocalStorageUtils() : undefined;

export default localStorageUtils;
