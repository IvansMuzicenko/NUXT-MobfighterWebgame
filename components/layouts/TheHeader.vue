<template>
  <div>
    <header>
      <nav class="d-flex" :class="{ 'justify-content-center': !nickname }">
        <h1 class="mx-2 p-1 shadow-text">
          <nuxt-link to="/">Mob Fighter</nuxt-link>
        </h1>
        <ul v-show="nickname" class="d-flex m-0">
          <li class="mx-3 my-1">
            <ui-base-button link to="character" class="outline"
              >Character</ui-base-button
            >
          </li>
          <li class="mx-3 my-1">
            <ui-base-button link to="quests" class="outline"
              >Quests</ui-base-button
            >
          </li>
          <li class="mx-3 my-1">
            <ui-base-button link to="market" class="outline"
              >Market</ui-base-button
            >
          </li>
          <li class="mx-3 my-1">
            <ui-base-button link to="battle-board" class="outline"
              >Battle Board</ui-base-button
            >
          </li>
        </ul>
      </nav>
    </header>
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

<style lang="scss" scoped>
header {
  border: 3px solid #996900;

  ul {
    list-style: none;
  }

  .shadow-text {
    text-shadow: 0 0 2rem white, 1px 1px 2rem white, -1px -1px 2rem white;
  }
}
</style>
