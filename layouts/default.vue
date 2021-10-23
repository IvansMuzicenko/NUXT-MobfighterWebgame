<template>
  <div class="background">
    <layouts-the-header></layouts-the-header>
    <ui-base-loader v-if="isLoading"></ui-base-loader>
    <nuxt v-else />
  </div>
</template>

<script>
export default {
  middleware({ store, redirect, route }) {
    if (route.fullPath !== '/' && !store.getters.nickname) {
      return redirect('/')
    }
  },
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
@import url('https://fonts.googleapis.com/css2?family=Inknut+Antiqua:wght@500&display=swap');

.background {
  background: url('/background.jpg');
  background-size: cover;
  width: auto;
  overflow-x: hidden;
  height: 100vh;
}
</style>
