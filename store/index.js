const CHANGE_NICK = 'CHANGE_NICK'

export const state = () => ({
  nickname: '',
})

export const mutations = {
  CHANGE_NICK(state, nickname) {
    state.nickname = nickname
  },
}

export const actions = {
  changeNick({ commit }, nickname) {
    commit(CHANGE_NICK, nickname)
    this.$cookies.set('nickname', nickname, { maxAge: 60 * 60 * 24 * 365 })
  },
}

export const getters = {
  nickname: (state) => state.nickname,
}
