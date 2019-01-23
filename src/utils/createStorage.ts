function createStorage(storageType = 'session') {
  const _storage =
    storageType === 'session' ? window.sessionStorage : window.localStorage
  return {
    setItem: (key: string, value: any) => {
      _storage.setItem(key, JSON.stringify(value))
    },

    getItem: (key: string) => {
      return _storage[key] ? JSON.parse(_storage.getItem(key) || '') : ''
    },

    removeItem: (key: string) => {
      if (_storage[key]) _storage.removeItem(key)
    },

    clear: () => {
      _storage.clear()
    }
  }
}

export default createStorage
