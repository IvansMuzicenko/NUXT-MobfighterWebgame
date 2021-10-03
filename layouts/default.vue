<template>
  <div class="background">
    <layouts-the-header></layouts-the-header>
    <nuxt />
  </div>
</template>

<script>
export default {
  beforeCreate() {
    const nickname = this.$cookies.get('nickname')
    if (nickname) {
      this.$store.dispatch('changeNick', nickname)
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
  overflow: hidden;
  height: 100vh;
}
</style>
