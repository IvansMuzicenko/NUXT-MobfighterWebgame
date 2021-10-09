<template>
  <div>
    <form @submit.prevent="submitLogin()">
      <ui-base-input id="nickname" v-model="value">Nickname</ui-base-input>
      <ui-base-button type="submit" class="filled">Enter</ui-base-button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: '',
    }
  },
  methods: {
    submitLogin() {
      this.$store.dispatch('setNick', this.value)
    },
  },
}
</script>
