import createPersistedState from 'vuex-persistedstate'
import Cookies from 'js-cookie'

export default ({ store }) => {
  createPersistedState({
    key: 'character',
    storage: {
      getItem: (key) => Cookies.get(key),
      setItem: (key, value) =>
        Cookies.set(key, value, { expires: 60 * 60 * 24 * 365, secure: true }),
      removeItem: (key) => Cookies.remove(key),
    },
  })(store)
}
