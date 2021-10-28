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
        offHand: null,
        mainHand: null,
        twoHand: null,
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
        (weapon.offHand?.stats?.attackPower || 0) +
        (weapon.mainHand?.stats?.attackPower || 0) +
        (weapon.twoHand?.stats?.attackPower || 0)
      depStats.defPower = stats.AGI
      depStats.spellPower =
        stats.INT +
        (weapon.offHand?.stats?.spellPower || 0) +
        (weapon.mainHand?.stats?.spellPower || 0) +
        (weapon.twoHand?.stats?.spellPower || 0)
      stats.ARMOR += depStats.defPower
      // stats.STR += stats.pointsSTR
      // stats.AGI += stats.pointsAGI
      // stats.INT += stats.pointsINT
    }
  },

  SELL_ITEM(state, soldItem) {
    state.character.money += Math.ceil(soldItem.cost / 2)
    state.character.items = state.character.items.filter(
      (item) => item.key !== soldItem.key
    )
  },

  EQUIP_ITEM(state, equipItem) {
    const equippedItem =
      state.character.equipment[equipItem.type.toLowerCase()][equipItem.slot]
    if (equipItem.slot === 'twoHand') {
      if (state.character.equipment.weapon.offHand !== null) {
        state.character.items.push(state.character.equipment.weapon.offHand)
        state.character.equipment.weapon.offHand = null
      }
      if (state.character.equipment.weapon.mainHand !== null) {
        state.character.items.push(state.character.equipment.weapon.mainHand)
        state.character.equipment.weapon.mainHand = null
      }
    }

    if (equipItem.slot === 'offHand' || equipItem.slot === 'mainHand') {
      if (state.character.equipment.weapon.twoHand !== null) {
        state.character.items.push(state.character.equipment.weapon.twoHand)
        state.character.equipment.weapon.twoHand = null
      }
    }

    if (equippedItem !== null) {
      state.character.items.push(equippedItem)
      if (equippedItem.stats.STR > 0) {
        state.character.depStats.HP -= equippedItem.stats.STR * 5
      }
      if (equippedItem.stats.INT > 0) {
        state.character.depStats.MP -= equippedItem.stats.INT * 5
      }
    }
    state.character.equipment[equipItem.type.toLowerCase()][equipItem.slot] =
      equipItem
    state.character.items = state.character.items.filter(
      (item) => item.key !== equipItem.key
    )
    if (equipItem.stats.STR > 0) {
      state.character.depStats.HP += equipItem.stats.STR * 5
    }
    if (equipItem.stats.INT > 0) {
      state.character.depStats.MP += equipItem.stats.INT * 5
    }
  },
  UNEQUIP_ITEM(state, item) {
    if (item !== null) {
      state.character.items.push(item)
      state.character.equipment[item.type.toLowerCase()][item.slot] = null
      if (item.stats.STR > 0) {
        state.character.depStats.HP -= item.stats.STR * 5
      }
      if (item.stats.INT > 0) {
        state.character.depStats.MP -= item.stats.INT * 5
      }
    }
  },
  RESTORE(state) {
    const depStats = state.character.depStats
    if (depStats.HP < 0) {
      depStats.HP = 0
    }

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
  SAVE_BATTLE_HP(state, hp) {
    if (hp < 0) hp = 0
    state.character.depStats.HP = hp
  },
  SAVE_BATTLE_XP(state, xp) {
    if (state.character.xp + Number(xp) >= state.character.reqXp) {
      const xpOverflow = state.character.xp + Number(xp) - state.character.reqXp
      state.character.lvl += 1
      state.character.xp = xpOverflow
    } else {
      state.character.xp += Number(xp)
    }
  },
  SAVE_BATTLE_MONEY(state, money) {
    if (money !== null) {
      state.character.money += money
    }
  },
  SAVE_BATTLE_ITEM(state, item) {
    if (item !== null) {
      state.character.items.push(item)
    }
  },
}

export const actions = {
  setNick({ commit, dispatch }, nickname) {
    commit('SET_NICK', nickname)
    dispatch('saveData')
  },
  startTimer({ commit, dispatch }) {
    setInterval(() => {
      commit('RESTORE')
      dispatch('saveData')
    }, 5000)
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
  saveBattleHP({ commit }, hp) {
    commit('SAVE_BATTLE_HP', hp)
  },
  saveBattleXP({ commit }, xp) {
    commit('SAVE_BATTLE_XP', xp)
  },
  saveBattleMoney({ commit, dispatch }, money) {
    commit('SAVE_BATTLE_MONEY', money)
    dispatch('saveData')
  },
  saveBattleItem({ commit, dispatch }, item) {
    commit('SAVE_BATTLE_ITEM', item)
    dispatch('saveData')
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
