export const state = () => ({
  character: {
    nickname: null,
    lvl: 1,
    xp: 55,
    reqXp: 100,
    money: 10,
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
        reserve: null,
      },
    },
    items: [],
    market: {
      lastUpdate: null,
      products: [],
    },
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

  BUY_ITEM(state, product) {
    if (state.character.money >= product.cost) {
      state.character.money -= product.cost
      state.character.items.push(product)
      state.character.market.products = state.character.market.products.filter(
        (item) => item.key !== product.key
      )
    }
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
  },
  UNEQUIP_ITEM(state, item) {
    if (item !== null) {
      state.character.items.push(item)
      state.character.equipment[item.type.toLowerCase()][item.slot] = null
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
  GENERATE_PRODUCTS(state) {
    state.character.market.products = []
    const armorSlots = ['head', 'shoulder', 'chest', 'arms', 'leggins', 'boots']
    const weaponSlots = ['LHand', 'RHand', 'THand', 'reserve']
    const market = state.character.market
    const lvl = state.character.lvl
    market.lastUpdate = Date.now()

    for (let i = 0; i < 10; i++) {
      let itemType = ''
      let itemSlot = ''
      let itemRarity = ''
      let itemCost = null
      let itemName = ''
      let grip = ''
      const itemKey = Date.now() + i
      let attrPoints = null

      let armorPoints = null
      let strPoints = null
      let agiPoints = null
      let intPoints = null
      let atckPowerPoints = null
      let splPowerPoints = null

      const rarityRand = Math.floor(Math.random() * 100)
      if (rarityRand <= 70) {
        itemRarity = 'common'
        attrPoints = lvl
      } else if (rarityRand > 70 && rarityRand <= 90) {
        itemRarity = 'rare'
        attrPoints = (lvl * 1.5).toFixed()
      } else if (rarityRand > 90 && rarityRand <= 98) {
        itemRarity = 'epic'
        attrPoints = (lvl * 2).toFixed()
      } else if (rarityRand > 98 && rarityRand <= 100) {
        itemRarity = 'legendary'
        attrPoints = (lvl * 3).toFixed()
      }

      if (Math.ceil(Math.random() * 10) <= 7) {
        itemType = 'armor'
        itemSlot = armorSlots[Math.floor(Math.random() * 6)]
        itemName = itemSlot
        for (let i = 0; i < attrPoints; i++) {
          const randStat = Math.ceil(Math.random() * 4)
          armorPoints = lvl
          if (randStat === 1) {
            armorPoints += 1
          } else if (randStat === 2) {
            strPoints += 1
          } else if (randStat === 3) {
            agiPoints += 1
          } else {
            intPoints += 1
          }
        }
      } else {
        itemType = 'weapon'
        itemSlot = weaponSlots[Math.floor(Math.random() * 4)]
        if (itemSlot === 'THand') {
          grip = 'Two-handed'
          if (Math.random() <= 0.5) {
            itemName = 'sword'
            atckPowerPoints = attrPoints * 2.5
          } else {
            itemName = 'staff'
            splPowerPoints = attrPoints * 2.5
          }
        } else if (itemSlot === 'LHand') {
          grip = 'Left-handed'
          if (Math.random() <= 0.5) {
            itemName = 'dagger'
            atckPowerPoints = attrPoints
          } else {
            itemName = 'wand'
            splPowerPoints = attrPoints
          }
        } else if (itemSlot === 'RHand') {
          grip = 'Right-handed'
          if (Math.random() <= 0.5) {
            itemName = 'dagger'
            atckPowerPoints = attrPoints
          } else {
            itemName = 'wand'
            splPowerPoints = attrPoints
          }
        } else if (itemSlot === 'reserve') {
          itemName = 'knife'
          grip = 'Reserve'
          atckPowerPoints = attrPoints / 2
        }
      }

      const itemStats = {
        ARMOR: Math.ceil(armorPoints),
        STR: Math.ceil(strPoints),
        AGI: Math.ceil(agiPoints),
        INT: Math.ceil(intPoints),
        attackPower: Math.ceil(atckPowerPoints),
        spellPower: Math.ceil(splPowerPoints),
      }
      for (const stat in itemStats) {
        itemCost += itemStats[stat]
      }

      const newItem = {
        type: itemType,
        slot: itemSlot,
        rarity: itemRarity,
        cost: itemCost,
        name: grip + ' ' + itemName,
        key: itemKey,
        stats: itemStats,
      }
      market.products.push(newItem)
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
  buyItem({ commit, dispatch }, product) {
    commit('BUY_ITEM', product)
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
  generateProducts({ commit }) {
    commit('GENERATE_PRODUCTS')
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
