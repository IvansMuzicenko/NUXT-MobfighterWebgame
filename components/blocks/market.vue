<template>
  <div class="relative frame">
    <ui-base-banner>Market</ui-base-banner>
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
    <ul class="p-2">
      <li
        v-for="product in products"
        :key="product.key"
        class="px-8 frame lg:flex lg:justify-between"
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
