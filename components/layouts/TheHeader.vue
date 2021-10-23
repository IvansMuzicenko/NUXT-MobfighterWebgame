<template>
  <div>
    <header>
      <img src="/banner-lg.png" class="absolute banner w-full" />
      <nav
        class="absolute top-2 w-full flex justify-center"
        :class="{ 'text-center': !nickname }"
      >
        <ul v-show="nickname" class="flex justify-around w-2/5">
          <li class="mx-12 my-4">
            <ui-base-button link to="character" class="outline"
              >Character</ui-base-button
            >
          </li>

          <h1 class="mx-4 shadow-text title tracking-tighter">
            <nuxt-link to="/">🗡 Mob Fighter 🛡</nuxt-link>
          </h1>

          <li class="mx-12 my-4">
            <ui-base-button link to="battle-board" class="outline"
              >Map</ui-base-button
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
.title {
  font-size: 1.5rem;
  @media screen and (min-width: 1024px) {
    font-size: 2rem;
  }
}
header {
  nav {
    z-index: 1000;
  }

  .banner {
    height: 68px;
    z-index: 999;
  }

  ul {
    list-style: none;
  }

  .shadow-text {
    text-shadow: 0 0 2rem white, 1px 1px 2rem white, -1px -1px 2rem white;
  }
}
</style>
