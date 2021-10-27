<template>
  <div class="relative max-height frame">
    <img src="/banner-lg.png" class="absolute top-0 left-0 w-full h-8" />
    <h2 class="absolute top-0 left-0 w-full text-xl text-center">Inventory</h2>
    <br />
    <br />
    <div class="overflow">
      <h4 class="mt-8 text-center">Items:</h4>
      <p v-if="items.length == 0">No items in your inventory.</p>
      <ul v-else>
        <li v-for="item in items" :key="item.key" class="p-2 frame">
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
            >
              Equip
            </ui-base-button>
            <ui-base-button
              v-if="sell"
              class="outline--small"
              :disabled="!item.key"
              @click="sellItem(item)"
            >
              Sell
            </ui-base-button>
            <span>
              Cost:
              {{ Math.ceil(item.cost / 2) }}
              monets
            </span>
          </div>
        </li>
      </ul>
    </div>
    <div class="frame">Money: {{ character.money }} monets</div>
  </div>
</template>

<script>
export default {
  props: {
    sell: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
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
.overflow {
  max-height: 90vh;
}
ul {
  max-height: 70vh;
  min-height: 70vh;
  overflow-y: auto;
}
li:hover {
  cursor: pointer;
}

@media screen and (min-width: 992px) {
  .max-height {
    max-height: 90vh;
  }
}
</style>
