<template>
  <div class="relative px-8 pt-12 max-height frame">
    <img src="/banner-lg.png" class="absolute top-0 left-0 w-full h-8" />
    <h2 class="absolute top-0 left-0 w-full text-xl text-center">Character</h2>
    <blocks-character-info />
    <blocks-character-armor />
    <blocks-character-weapon />
  </div>
</template>

<style lang="scss">
.max-height {
  height: max-content;
  @media screen and (min-width: 992px) {
    max-height: 90vh;
  }
}
</style>
