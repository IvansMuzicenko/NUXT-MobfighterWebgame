<template>
  <div>
    <h2 class="d-flex justify-content-center">Home</h2>
    <p>
      Hello and welcome to Mob Fighter game. Here you can fight with mobs and
      bosses and earn experience to upgrade your character and feel yourself
      good!
    </p>
    <p v-if="nickname">
      Hi, {{ nickname }}. You are logged in! Prepare yourself for
      <nuxt-link to="battle-board">battle</nuxt-link>, fighter!
    </p>
    <forms-login-form v-else />
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
