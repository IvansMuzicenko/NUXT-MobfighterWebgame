export const state = () => ({
  market: {
    lastUpdate: null,
    products: [],
  },
})
export const mutations = {
  GENERATE_PRODUCTS(state, rootState) {
    state.market.products = []
    const armorSlots = ['head', 'shoulder', 'chest', 'arms', 'leggins', 'boots']
    const weaponSlots = ['LHand', 'RHand', 'THand', 'reserve']
    const market = state.market
    const lvl = rootState.character.lvl
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
        attrPoints = lvl * 2
      } else if (rarityRand > 98 && rarityRand <= 100) {
        itemRarity = 'legendary'
        attrPoints = lvl * 3
      }

      if (Math.ceil(Math.random() * 10) <= 7) {
        itemType = 'armor'
        itemSlot = armorSlots[Math.floor(Math.random() * 6)]
        itemName = itemSlot
        armorPoints = lvl
        for (let i = 0; i < attrPoints; i++) {
          const randStat = Math.ceil(Math.random() * 4)
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
  BUY_ITEM(state, { rootState, product }) {
    if (rootState.character.money >= product.cost) {
      rootState.character.money -= product.cost
      rootState.character.items.push(product)
      state.market.products = state.market.products.filter(
        (item) => item.key !== product.key
      )
    }
  },
}

export const actions = {
  generateProducts({ commit, rootState }) {
    commit('GENERATE_PRODUCTS', rootState)
  },
  buyItem({ commit, dispatch, rootState }, product) {
    commit('BUY_ITEM', { rootState, product })
    dispatch('saveData', null, { root: true })
  },
}
export const getters = {
  market: (state) => state.market,
}
