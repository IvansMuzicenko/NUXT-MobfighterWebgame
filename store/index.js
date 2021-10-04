export const state = () => ({
  nickname: '',
  character: {
    lvl: 1,
    xp: 0,
    reqXp: 100,
    money: 0,
  },
  stats: {
    HP: 100,
    MP: 10,
    ARMOR: 0,
    STR: 1,
    AGI: 1,
    INT: 1,
  },
  armor: {
    head: 'none',
    neck: 'none',
    shoulder: 'none',
    chest: 'none',
    arms: 'none',
    leggins: 'none',
    boots: 'none',
    ring: 'none',
  },
  weapon: {
    fstLHand: 'none',
    fstRHand: 'none',
    sndLHand: 'none',
    sndRHand: 'none',
  },
  items: [
    {
      type: 'Head',
      key: '1',
      stats: {
        ARMOR: 1,
        STR: 0,
        AGI: 1,
        INT: 1,
      },
    },
    {
      type: 'Chest',
      key: '2',
      stats: {
        ARMOR: 1,
        STR: 1,
        AGI: 1,
        INT: 1,
      },
    },
    {
      type: 'Leggins',
      key: '3',
      stats: {
        ARMOR: 2,
        STR: 0,
        AGI: 0,
        INT: 1,
      },
    },
  ],
})

export const mutations = {
  CHANGE_NICK(state, nickname) {
    state.nickname = nickname
  },
  SELL_ITEM(state, soldItem) {
    state.character.money += soldItem.cost
    state.items = state.items.filter((item) => item.key !== soldItem.key)
  },
}

export const actions = {
  changeNick({ commit }, nickname) {
    commit('CHANGE_NICK', nickname)
    this.$cookies.set('nickname', nickname, { maxAge: 60 * 60 * 24 * 365 })
  },
  sellItem({ commit }, soldItem) {
    commit('SELL_ITEM', soldItem)
  },
}

export const getters = {
  nickname: (state) => state.nickname,
  character: (state) => state.character,
  stats: (state) => state.stats,
  armor: (state) => state.armor,
  weapon: (state) => state.weapon,
  items: (state) => state.items,
}
