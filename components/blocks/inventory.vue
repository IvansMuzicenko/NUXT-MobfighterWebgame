<template>
  <div class="max-height frame mx-3 w-90vw w-45vw-lg">
    <h3 class="d-flex justify-content-center">Inventory</h3>
    <section class="frame">
      <h4 class="d-flex justify-content-center">Items:</h4>
      <p v-if="!items">No items in your inventory</p>
      <ul v-else class="max-height-ul">
        <li v-for="item in items" :key="item.key" class="frame px-2 py-1">
          <span :class="item.rarity">
            {{ item.type }}: {{ item.rarity }} {{ item.name }} -
          </span>
          <span v-if="item.stats.ARMOR && item.stats.ARMOR != 0" class="armor">
            armor: {{ item.stats.ARMOR }}</span
          ><span v-if="item.stats.STR && item.stats.STR != 0" class="str">
            strength: {{ item.stats.STR }}</span
          ><span v-if="item.stats.AGI && item.stats.AGI != 0" class="agi">
            agility: {{ item.stats.AGI }}</span
          ><span v-if="item.stats.INT && item.stats.INT != 0" class="int">
            intelligence: {{ item.stats.INT }}</span
          >
          <span
            v-if="item.stats.attackPower && item.stats.attackPower != 0"
            class="str"
          >
            attack power: {{ item.stats.attackPower }}</span
          >
          <span
            v-if="item.stats.spellPower && item.stats.spellPower != 0"
            class="int"
          >
            spell power: {{ item.stats.spellPower }}</span
          >
          <div>
            <ui-base-button
              class="outline--small"
              :disabled="!item.key"
              @click="equipItem(item)"
              >Equip</ui-base-button
            >
            <ui-base-button
              class="outline--small"
              :disabled="!item.key"
              @click="sellItem(item)"
              >Sell</ui-base-button
            >
            <span>
              Cost:
              {{ Math.ceil(item.cost / 2) }}
              monets
            </span>
          </div>
        </li>
      </ul>
    </section>
    <div class="frame">Money: {{ character.money }} monets</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedItem: {},
    }
  },
  computed: {
    items() {
      return this.$store.getters.character.items
    },
    character() {
      return this.$store.getters.character
    },
  },
  methods: {
    sellItem(sellItem) {
      this.$store.dispatch('sellItem', sellItem)
    },
    equipItem(equipItem) {
      this.$store.dispatch('equipItem', equipItem)
    },
  },
}
</script>

<style lang="scss" scoped>
.common {
  color: rgb(20, 20, 20);
}

.rare {
  color: rgb(0, 100, 255);
}

.epic {
  color: rgb(220, 0, 220);
}

.legendary {
  color: rgb(255, 125, 0);
}

.max-height {
  height: max-content;
  @media screen and (min-width: 992px) {
    max-height: 90vh;
  }
}

.max-height-ul {
  @media screen and (min-width: 992px) {
    max-height: 60vh; //fill-available in experimental
    overflow: auto;
  }
}
</style>
