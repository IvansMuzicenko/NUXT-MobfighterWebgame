<template>
  <div>
    <header>
      <nav class="d-flex h-10rem">
        <h3 class="m-2 p-2"><nuxt-link to="/"> Mob Fighter</nuxt-link></h3>
        <ul class="d-flex m-0">
          <li class="h-3 mx-1 p-2">
            <nuxt-link to="character">Character</nuxt-link>
          </li>
          <li class="h-3 mx-1 p-2">
            <nuxt-link to="quests">Quests</nuxt-link>
          </li>
          <li class="h-3 mx-1 p-2">
            <nuxt-link to="market">Market</nuxt-link>
          </li>
          <li class="h-3 mx-1 p-2">
            <nuxt-link to="battle-board">Battle Board</nuxt-link>
          </li>
        </ul>
      </nav>
    </header>
  </div>
</template>

<style lang="scss" scoped>
ul {
  list-style: none;
  li {
    border: 2px solid black;
  }
}
</style>
