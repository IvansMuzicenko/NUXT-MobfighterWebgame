<template>
  <div class="frame relative lg:w-3/4">
    <img src="/banner-lg.png" class="absolute left-0 top-0 w-full h-8" />
    <h2 class="absolute left-0 top-0 w-full text-center text-xl">Market</h2>
    <div class="frame">
      <br />
      <p>
        Next market refresh available after
        {{ Math.floor(nextUpdate / 60) }} :
        {{ (nextUpdate % 60).toFixed(0) }}
      </p>
      <ui-base-button class="filled--small" @click="generateProducts()"
        >Refresh</ui-base-button
      >
    </div>
    <ul class="px-4">
      <li
        v-for="product in products"
        :key="product.key"
        class="frame px-8 lg:flex lg:justify-between"
      >
        <div>
          <span :class="product.rarity">
            {{ product.type }} ({{ product.itemLVL }}): {{ product.rarity }}
            {{ product.name }}</span
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
        </div>

        <div>
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
  middleware({ store, redirect, route }) {
    if (route.query.minlvl > store.getters.character.lvl) {
      return redirect('/battle-board')
    }
  },
  data() {
    return {
      zone: this.$route.query.zone,
      // market: this.$store.getters['market/market'],
      intervalId: null,
      currentTime: null,
    }
  },
  computed: {
    nextUpdate() {
      const tillUpdate =
        (this.market[this.zone].lastUpdate + 30 * 60000 - this.currentTime) /
        1000

      if (tillUpdate <= 0) {
        this.$store.dispatch('market/generateProducts', this.$route.query)
      }
      return tillUpdate
    },

    money() {
      return this.$store.getters.character.money
    },
    market() {
      return this.$store.getters['market/market']
    },
    products() {
      return this.market[this.zone].products
    },
  },
  mounted() {
    if (this.products.length === 0) {
      this.$store.dispatch('market/generateProducts', this.$route.query)
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
      this.$store.dispatch('market/generateProducts', this.$route.query)
    },
    buyItem(product) {
      const query = this.$route.query
      const item = { product, query }
      if (product.cost <= this.money)
        this.$store.dispatch('market/buyItem', item)
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
