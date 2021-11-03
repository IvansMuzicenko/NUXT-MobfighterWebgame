<template>
  <div class="relative px-8 pt-12 max-height frame">
    <ui-base-banner>Character</ui-base-banner>
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
