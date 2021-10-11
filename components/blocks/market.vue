<template>
  <div class="frame">
    <p>
      Next market refresh available after
      {{ Math.floor(nextUpdate / 60) }} :
      {{ (nextUpdate % 60).toFixed(0) }}
    </p>
    <ui-base-button class="outline-small" @click="generateProducts()"
      >Refresh</ui-base-button
    >
    <ul class="frame">
      <li v-for="product in products" :key="product.key">{{ product }}</li>
    </ul>
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

    market() {
      return this.$store.getters.market
    },
    products() {
      return this.$store.getters.products
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
  },
}
</script>
