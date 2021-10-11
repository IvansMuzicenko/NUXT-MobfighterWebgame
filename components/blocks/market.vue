<template>
  <div class="frame mx-5vw">
    <div class="frame">
      <p>
        Next market refresh available after
        {{ Math.floor(nextUpdate / 60) }} :
        {{ (nextUpdate % 60).toFixed(0) }}
      </p>
      <ui-base-button class="filled--small" @click="generateProducts()"
        >Refresh</ui-base-button
      >
    </div>
    <ul>
      <li
        v-for="product in products"
        :key="product.key"
        class="frame px-2 d-flex-xl"
      >
        <span :class="product.rarity">
          {{ product.type }}: {{ product.rarity }} {{ product.name }}</span
        >
        <span
          v-if="product.stats.ARMOR && product.stats.ARMOR != 0"
          class="armor"
        >
          armor: {{ product.stats.ARMOR }}</span
        ><span v-if="product.stats.STR && product.stats.STR != 0" class="str">
          strength: {{ product.stats.STR }}</span
        ><span v-if="product.stats.AGI && product.stats.AGI != 0" class="agi">
          agility: {{ product.stats.AGI }}</span
        ><span v-if="product.stats.INT && product.stats.INT != 0" class="int">
          intelligence: {{ product.stats.INT }}</span
        >
        <span
          v-if="product.stats.attackPower && product.stats.attackPower != 0"
          class="str"
        >
          attack power: {{ product.stats.attackPower }}</span
        >
        <span
          v-if="product.stats.spellPower && product.stats.spellPower != 0"
          class="int"
        >
          spell power: {{ product.stats.spellPower }}</span
        >

        <div class="ml-auto-xl">
          Cost: {{ product.cost }} monets
          <ui-base-button
            class="outline--small"
            :disabled="product.cost > money"
            @click="buyItem(product)"
            >Buy</ui-base-button
          >
        </div>
      </li>
    </ul>
    <div class="frame">Money: {{ money }} monets</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      intervalId: null,
      currentTime: null,
    }
  },
  computed: {
    nextUpdate() {
      let tillUpdate =
        (this.$store.getters.market.lastUpdate +
          30 * 60000 -
          this.currentTime) /
        1000

      if (tillUpdate <= 0) {
        tillUpdate = 0
      }
      return tillUpdate
    },

    money() {
      return this.$store.getters.character.money
    },
    market() {
      return this.$store.getters.market
    },
    products() {
      return this.$store.getters.market.products
    },
  },
  mounted() {
    if (this.market.products.length === 0) {
      this.$store.dispatch('generateProducts')
    }
    this.intervalId = setInterval(() => {
      this.currentTime = Date.now()
    }, 1000)
  },
  unmounted() {
    clearInterval(this.intervalId)
  },
  methods: {
    generateProducts() {
      this.$store.dispatch('generateProducts')
    },
    buyItem(product) {
      if (product.cost <= this.money) this.$store.dispatch('buyItem', product)
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
ul {
  list-style: none;
}
</style>
