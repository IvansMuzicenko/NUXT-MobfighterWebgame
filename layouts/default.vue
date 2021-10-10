<template>
  <div class="background">
    <layouts-the-header></layouts-the-header>
    <ui-base-loader v-if="isLoading"></ui-base-loader>
    <nuxt v-else />
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: true,
    }
  },

  mounted() {
    this.isLoading = false
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
