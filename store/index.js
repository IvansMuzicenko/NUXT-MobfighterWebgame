export const state = () => ({
  character: {
    nickname: null,
    lvl: 1,
    xp: 0,
    reqXp: 100,
    money: 0,
    depStats: {
      HP: 100,
      maxHP: 100,
      MP: 0,
      maxMP: 0,
      attackPower: 0,
      defPower: 0,
      spellPower: 0,
    },
    stats: {
      ARMOR: 0,
      STR: 0,
      AGI: 0,
      INT: 0,
    },
    equipment: {
      armor: {
        head: 'none',
        shoulder: 'none',
        chest: 'none',
        arms: 'none',
        leggins: 'none',
        boots: 'none',
      },
      weapon: {
        LHand: 'none',
        RHand: 'none',
        THand: 'none',
        reserve: 'none',
      },
    },
    items: [
      {
        type: 'armor',
        slot: 'head',
        key: '1',
        stats: {
          ARMOR: 1,
          STR: 0,
          AGI: 1,
          INT: 1,
        },
      },
      {
        type: 'armor',
        slot: 'shoulder',
        key: '2',
        stats: {
          ARMOR: 1,
          STR: 1,
          AGI: 1,
          INT: 1,
        },
      },
      {
        type: 'armor',
        slot: 'chest',
        key: '3',
        stats: {
          ARMOR: 2,
          STR: 0,
          AGI: 0,
          INT: 1,
        },
      },
      {
        type: 'armor',
        slot: 'chest',
        key: '4',
        stats: {
          ARMOR: 1,
          STR: 0,
          AGI: 0,
          INT: 0,
        },
      },
      {
        type: 'weapon',
        name: 'sword',
        slot: 'THand',
        key: '5',
        stats: {
          attackPower: 10,
          spellPower: 0,
        },
      },
      {
        type: 'weapon',
        name: 'sword',
        slot: 'LHand',
        key: '6',
        stats: {
          attackPower: 10,
          spellPower: 0,
        },
      },
      {
        type: 'weapon',
        name: 'sword',
        slot: 'RHand',
        key: '7',
        stats: {
          attackPower: 10,
          spellPower: 0,
        },
      },
    ],
  },
})

export const mutations = {
  SET_NICK(state, nickname) {
    state.character.nickname = nickname
  },

  CALC_STATS(state) {
    if (state.character.nickname != null) {
      const armor = state.character.equipment.armor
      const weapon = state.character.equipment.weapon
      const stats = state.character.stats
      const depStats = state.character.depStats
      for (const stat in stats) {
        state.character.stats[stat] = 0
        for (const slot in armor) {
          if (armor[slot] !== 'none') {
            state.character.stats[stat] += armor[slot].stats[stat]
          }
        }
      }
      if (depStats.HP > depStats.maxHP) {
        depStats.HP = depStats.maxHP
      }
      if (depStats.MP > depStats.maxMP) {
        depStats.MP = depStats.maxMP
      }
      depStats.maxHP = 100 + stats.STR * 5
      depStats.maxMP = stats.INT * 5
      depStats.attackPower =
        stats.STR +
        (weapon.LHand?.stats?.attackPower || 0) +
        (weapon.RHand?.stats?.attackPower || 0) +
        (weapon.THand?.stats?.attackPower || 0)
      depStats.defPower = stats.AGI
      depStats.spellPower =
        stats.INT +
        (weapon.LHand?.stats?.spellPower || 0) +
        (weapon.RHand?.stats?.spellPower || 0) +
        (weapon.THand?.stats?.spellPower || 0)
      stats.ARMOR += depStats.defPower
      // stats.STR += stats.pointsSTR
      // stats.AGI += stats.pointsAGI
      // stats.INT += stats.pointsINT
    }
  },

  LOAD_DATA(state, character) {
    state.character = character
  },

  SELL_ITEM(state, soldItem) {
    state.character.money += soldItem.cost
    state.character.items = state.character.items.filter(
      (item) => item.key !== soldItem.key
    )
  },
  EQUIP_ITEM(state, equipItem) {
    const equippedItem =
      state.character.equipment[equipItem.type.toLowerCase()][equipItem.slot]
    if (equipItem.slot === 'THand') {
      if (state.character.equipment.weapon.LHand !== 'none') {
        state.character.items.push(state.character.equipment.weapon.LHand)
        state.character.equipment.weapon.LHand = 'none'
      }
      if (state.character.equipment.weapon.RHand !== 'none') {
        state.character.items.push(state.character.equipment.weapon.RHand)
        state.character.equipment.weapon.RHand = 'none'
      }
    }

    if (equipItem.slot === 'LHand' || equipItem.slot === 'RHand') {
      if (state.character.equipment.weapon.THand !== 'none') {
        state.character.items.push(state.character.equipment.weapon.THand)
        state.character.equipment.weapon.THand = 'none'
      }
    }

    if (equippedItem !== 'none') {
      state.character.items.push(equippedItem)
    }
    state.character.equipment[equipItem.type.toLowerCase()][equipItem.slot] =
      equipItem
    state.character.items = state.character.items.filter(
      (item) => item.key !== equipItem.key
    )
  },
  UNEQUIP_ITEM(state, item) {
    if (item !== 'none') {
      state.character.items.push(item)
      state.character.equipment[item.type.toLowerCase()][item.slot] = 'none'
    }
  },
  RESTORE(state) {
    const depStats = state.character.depStats

    if (depStats.HP !== depStats.maxHP && depStats.maxHP > depStats.HP) {
      depStats.HP += 5
    }

    if (depStats.MP !== depStats.maxMP && depStats.maxMP > depStats.MP) {
      depStats.MP += 5
    }
  },
}

export const actions = {
  setNick({ commit, dispatch }, nickname) {
    commit('SET_NICK', nickname)
    dispatch('saveData')
  },
  sellItem({ commit, dispatch }, soldItem) {
    commit('SELL_ITEM', soldItem)
    dispatch('saveData')
  },
  equipItem({ commit, dispatch }, equipItem) {
    commit('EQUIP_ITEM', equipItem)
    dispatch('saveData')
  },
  unequipItem({ commit, dispatch }, item) {
    commit('UNEQUIP_ITEM', item)
    dispatch('saveData')
  },
  startTimer({ commit, dispatch }) {
    // setInterval(() => {
    //   commit('RESTORE')
    //   dispatch('saveData')
    // }, 5000)
  },
  loadData({ commit }) {
    const character = this.$cookies.get('character')
    if (character) commit('LOAD_DATA', character)
  },
  saveData({ commit, state }) {
    commit('CALC_STATS')
    this.$cookies.set('character', JSON.stringify(state.character), {
      maxAge: 60 * 60 * 24 * 365,
    })
  },
}

export const getters = {
  character: (state) => state.character,
  nickname: (state) => state.character.nickname,
}
