<template>
  <div class="max-height frame mx-3 w-90vw w-40vw-lg">
    <h3 class="d-flex justify-content-center">Inventory</h3>
    <section class="p-1 frame">
      <div>
        <ui-base-button class="outline" :disabled="!selectedItem.key"
          >Equip</ui-base-button
        >
        <ui-base-button
          class="outline"
          :disabled="!selectedItem.key"
          @click="sellItem(selectedItem)"
          >Sell</ui-base-button
        >
        <span v-if="!!selectedItem.key"
          >Cost:
          {{ selectedItem.cost }}
          monets</span
        >
      </div>
      <h4 class="d-flex justify-content-center">Items:</h4>
      <p v-if="!items">No item in your inventory</p>
      <ul v-else class="mx-3 max-height-ul">
        <li
          v-for="item in items"
          :key="item.key"
          class="item"
          :class="{ 'item--selected': item.key == selectedItem.key }"
          @click="selectItem(item)"
        >
          {{ item.type }} -<span class="armor">
            armor: ( {{ item.stats.ARMOR }} )</span
          ><span v-if="item.stats.STR != 0" class="str">
            , strength: ( {{ item.stats.STR }} )</span
          ><span v-if="item.stats.AGI != 0" class="agi">
            , agility: ( {{ item.stats.AGI }} )</span
          ><span v-if="item.stats.INT != 0" class="int">
            , intelligence: ( {{ item.stats.INT }} )</span
          >
        </li>
      </ul>
      <span class="bank">Money: {{ character.money }} monets</span>
    </section>
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
      return this.$store.getters.items
    },
    character() {
      return this.$store.getters.character
    },
  },
  methods: {
    selectItem(item) {
      this.selectedItem = item
      this.selectedItem.cost =
        this.selectedItem.stats.ARMOR +
        this.selectedItem.stats.STR +
        this.selectedItem.stats.AGI +
        this.selectedItem.stats.INT
    },
    sellItem(sellItem) {
      this.selectedItem = {}
      this.$store.dispatch('sellItem', sellItem)
    },
  },
}
</script>

<style lang="scss" scoped>
.item {
  cursor: pointer;

  &--selected {
    background: #4e35003b;
    border: 1px solid #4e3500;
  }
}

.bank {
  border-top: 1px solid #4e3500;
}

.max-height {
  height: max-content;
  @media screen and (min-width: 992px) {
    max-height: 80vh;
  }
}

.max-height-ul {
  @media screen and (min-width: 992px) {
    max-height: 60vh; //fill-available in experimental
    overflow: auto;
  }
}

.frame {
  text-shadow: 0 0 2rem white, 1px 1px 2rem white, -1px -1px 2rem white;
  box-shadow: 0 0 2rem 0.2rem #4e3500;
  border: 3px solid #4e3500;
}
</style>
