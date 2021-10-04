<template>
  <div>
    <h2 class="d-flex justify-content-center">Home</h2>
    <p class="d-flex justify-content-center">
      Hello and welcome to Mob Fighter game. Here you can fight with mobs and
      bosses and earn experience to upgrade your character and feel yourself
      good!
    </p>
    <br />
    <p v-if="nickname" class="d-flex justify-content-center">
      Hi, {{ nickname }}. You are logged in! Prepare yourself for
      <nuxt-link to="battle-board">battle</nuxt-link>, fighter!
    </p>
    <forms-login-form v-else class="d-flex justify-content-center" />
  </div>
</template>

<script>
export default {
  computed: {
    nickname() {
      return this.$store.getters.nickname
    },
  },
}
</script>
