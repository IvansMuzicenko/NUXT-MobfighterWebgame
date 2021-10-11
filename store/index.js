export const state = () => ({
  character: {
    nickname: null,
    lvl: 1,
    xp: 0,
    reqXp: 100,
    money: 0,
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
    items: [
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
  },
  UNEQUIP_ITEM(state, item) {
    if (item !== null) {
      state.character.items.push(item)
      state.character.equipment[item.type.toLowerCase()][item.slot] = null
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
  GENERATE_PRODUCTS(state) {
    const armorSlots = ['head', 'shoulder', 'chest', 'arms', 'leggins', 'boots']
    const weaponSlots = ['LHand', 'RHand', 'THand', 'reserve']
    const market = state.character.market
    const lvl = state.character.lvl
    market.lastUpdate = Date.now()

    for (let i = 0; i < 10; i++) {
      let itemType = ''
      let itemSlot = ''
      let itemRarity = ''
      let itemName = ''
      let attrPoints = null
      const itemKey = Date.now() + i
      const rarityRand = Math.floor(Math.random() * 100)
      if (Math.ceil(Math.random() * 10) <= 7) {
        itemType = 'armor'
        itemSlot = armorSlots[Math.floor(Math.random() * 7)]
        itemName = itemSlot
      } else {
        itemType = 'weapon'
        itemSlot = weaponSlots[Math.floor(Math.random() * 4)]
        switch (itemSlot) {
          case 'THand':
            if (Math.random().toFixed() === 0) {
              itemName = 'sword'
            } else {
              itemName = 'staff'
            }
            break
          case 'LHand' || 'RHand':
            if (Math.random().toFixed() === 0) {
              itemName = 'dagger'
            } else {
              itemName = 'wand'
            }
            break
          case 'reserve':
            itemName = 'knife'
            break
        }
      }
      switch (true) {
        case rarityRand <= 70:
          itemRarity = 'common'
          attrPoints = lvl
          break
        case rarityRand > 70 && rarityRand <= 90:
          itemRarity = 'rare'
          attrPoints = (lvl * 1.5).toFixed()
          break
        case rarityRand > 90 && rarityRand <= 98:
          itemRarity = 'epic'
          attrPoints = (lvl * 2).toFixed()
          break
        case rarityRand > 98 && rarityRand <= 100:
          itemRarity = 'legendary'
          attrPoints = (lvl * 2.5).toFixed()
          break
      }
      if (itemSlot === 'THand') {
        attrPoints *= 2.5
      }

      let armorPoints = lvl
      let strPoints = null
      let agiPoints = null
      let intPoints = null
      let atckPowerPoints = null
      let splPowerPoints = null

      if (itemType === 'armor') {
        for (let i = 0; i < attrPoints; i++) {
          const randStat = Math.ceil(Math.random * 4)
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
      } else if (itemName === 'sword' || itemName === 'dagger') {
        atckPowerPoints = attrPoints
      } else if (itemName === 'staff' || itemName === 'wand') {
        splPowerPoints = attrPoints
      } else {
        atckPowerPoints = attrPoints / 2
      }

      const itemStats = {
        ARMOR: armorPoints,
        STR: strPoints,
        AGI: agiPoints,
        INT: intPoints,
        attackPower: atckPowerPoints,
        spellPower: splPowerPoints,
      }

      const newItem = {
        type: itemType,
        slot: itemSlot,
        rarity: itemRarity,
        name: itemName,
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
