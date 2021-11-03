<template>
  <div>
    <br />
    <br />
    <br />
    <h2 class="text-center">Home</h2>
    <p class="text-center">
      Hello and welcome to Mob Fighter game. Here you can fight with mobs and
      bosses and earn experience to upgrade your character and feel yourself
      good!
    </p>
    <br />
    <p v-if="nickname" class="text-center">
      Hi, {{ nickname }}. You are logged in! Prepare yourself for
      <nuxt-link to="battle-board"> battle</nuxt-link>, fighter!
    </p>
    <forms-login-form v-else class="text-center" />
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
