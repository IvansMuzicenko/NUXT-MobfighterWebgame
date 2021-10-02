<template>
  <div>
    <header>
      <nav class="d-flex h-10rem">
        <h1 class="my-1 mx-2 p-2 shadow-text">
          <nuxt-link to="/"> Mob Fighter</nuxt-link>
        </h1>
        <ul class="d-flex m-0">
          <li class="m-2 p-1 shadow-text">
            <ui-base-button link to="character" classes="outline shadow-box"
              >Character</ui-base-button
            >
          </li>
          <li class="m-2 p-1 shadow-text">
            <ui-base-button link to="quests" classes="outline shadow-box"
              >Quests</ui-base-button
            >
          </li>
          <li class="m-2 p-1 shadow-text">
            <ui-base-button link to="market" classes="outline shadow-box"
              >Market</ui-base-button
            >
          </li>
          <li class="m-2 p-1 shadow-text">
            <ui-base-button link to="battle-board" classes="outline shadow-box"
              >Battle Board</ui-base-button
            >
          </li>
          <li class="m-2 p-1 shadow-text ml-20">
            <ui-base-button link to="login" classes="filled shadow-box"
              >Login</ui-base-button
            >
          </li>
        </ul>
      </nav>
    </header>
  </div>
</template>

<style lang="scss" scoped>
ul {
  list-style: none;
}
header {
  border: 3px solid #996900;
}
.shadow-text {
  text-shadow: 0 0 2rem white, 1px 1px 2rem white, -1px -1px 2rem white;
}
</style>
