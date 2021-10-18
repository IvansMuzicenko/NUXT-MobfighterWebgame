export const state = () => ({
  character: {
    nickname: null,
    lvl: 20,
    xp: 0,
    reqXp: 5,
    money: 1000,
    stats: {
      ARMOR: 0,
      STR: 0,
      AGI: 0,
      INT: 0,
    },
    depStats: {
      HP: 100,
      maxHP: 100,
      MP: 0,
      maxMP: 0,
      attackPower: 0,
      defPower: 0,
      spellPower: 0,
    },
    equipment: {
      armor: {
        head: null,
        shoulder: null,
        chest: null,
        arms: null,
        leggins: null,
        boots: null,
      },
      weapon: {
        LHand: null,
        RHand: null,
        THand: null,
        reserve: {
          type: 'weapon',
          slot: 'reserve',
          rarity: 'common',
          cost: '0',
          name: 'knife',
          key: '0',
          stats: {
            attackPower: 1,
          },
        },
      },
    },
    items: [],
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
          if (armor[slot] !== null) {
            state.character.stats[stat] += armor[slot].stats[stat]
          }
        }
      }

      state.character.reqXp = Math.ceil(
        5 * Math.pow(1.25, state.character.lvl - 1)
      )

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
      if (state.character.equipment.weapon.LHand !== null) {
        state.character.items.push(state.character.equipment.weapon.LHand)
        state.character.equipment.weapon.LHand = null
      }
      if (state.character.equipment.weapon.RHand !== null) {
        state.character.items.push(state.character.equipment.weapon.RHand)
        state.character.equipment.weapon.RHand = null
      }
    }

    if (equipItem.slot === 'LHand' || equipItem.slot === 'RHand') {
      if (state.character.equipment.weapon.THand !== null) {
        state.character.items.push(state.character.equipment.weapon.THand)
        state.character.equipment.weapon.THand = null
      }
    }

    if (equippedItem !== null) {
      state.character.items.push(equippedItem)
    }
    state.character.equipment[equipItem.type.toLowerCase()][equipItem.slot] =
      equipItem
    state.character.items = state.character.items.filter(
      (item) => item.key !== equipItem.key
    )
    if (equipItem.stats.STR > 0) {
      state.character.depStats.HP += equipItem.stats.STR * 5
    }
  },
  UNEQUIP_ITEM(state, item) {
    if (item !== null) {
      state.character.items.push(item)
      state.character.equipment[item.type.toLowerCase()][item.slot] = null
      if (item.stats.STR > 0) {
        state.character.depStats.HP -= item.stats.STR * 5
      }
    }
  },
  RESTORE(state) {
    const depStats = state.character.depStats

    if (depStats.HP > depStats.maxHP) {
      depStats.HP = depStats.maxHP
    }
    if (depStats.maxHP > depStats.HP) {
      depStats.HP += 5
    }

    if (depStats.MP > depStats.maxMP) {
      depStats.MP = depStats.maxMP
    }
    if (depStats.maxMP > depStats.MP) {
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
    setInterval(() => {
      commit('RESTORE')
      dispatch('saveData')
    }, 5000)
  },

  saveData({ commit }) {
    commit('CALC_STATS')
  },
}

export const getters = {
  character: (state) => state.character,
  nickname: (state) => state.character.nickname,
  market: (state) => state.character.market,
}
