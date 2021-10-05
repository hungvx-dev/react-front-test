export default class LocalStorage {
  static get = (key: string): string | null => {
    return localStorage.getItem(key)
  }

  static set = (key: string, _value: number | string | Record<string, unknown>): void => {
    let value = _value
    if (typeof value === 'object') {
      value = JSON.stringify(value)
    } else if (typeof value === 'number') {
      value = value + ''
    }
    localStorage.setItem(key, value)
  }

  static remove = (key: string): void => {
    localStorage.removeItem(key)
  }
}
