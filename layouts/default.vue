<template>
  <div class="background">
    <layouts-the-header></layouts-the-header>
    <nuxt />
  </div>
</template>

<script>
export default {
  beforeCreate() {
    this.$store.dispatch('loadData')
  },
  mounted() {
    if (this.$store.getters.character.nickname != null) {
      this.$store.dispatch('startTimer')
    }
  },
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap');
.background {
  background: url('/background.jpg');
  background-size: cover;
  width: auto;
  overflow-x: hidden;
  height: 100vh;
}
</style>
