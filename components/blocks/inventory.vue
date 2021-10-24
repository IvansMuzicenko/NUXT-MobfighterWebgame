<template>
  <div class="max-height frame relative">
    <img src="/banner-lg.png" class="absolute left-0 top-0 w-full h-8" />
    <h2 class="absolute left-0 top-0 w-full text-center text-xl">Inventory</h2>
    <br />
    <br />
    <section>
      <h4 class="text-center mt-8">Items:</h4>
      <p v-if="items.length == 0">No items in your inventory.</p>
      <ul v-else class="max-height-ul">
        <li v-for="item in items" :key="item.key" class="frame p-2">
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
    </section>
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
li:hover {
  cursor: pointer;
}
ul {
  overflow: hidden !important;
}

@media screen and (min-width: 992px) {
  .max-height {
    height: max-content;
    max-height: 90vh;
  }
  .max-height-ul {
    max-height: 60vh; //fill-available in experimental
    overflow: auto;
  }
}
</style>
