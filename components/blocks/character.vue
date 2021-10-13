<template>
  <div class="max-height frame mx-3 w-90vw w-45vw-lg p-2">
    <blocks-character-info />
    <blocks-character-armor />
    <blocks-character-weapon />
  </div>
</template>

<style lang="scss">
.common {
  color: rgb(20, 20, 20);
}

.rare {
  color: rgb(0, 100, 255);
}

.epic {
  color: rgb(220, 0, 220);
}

.legendary {
  color: rgb(255, 125, 0);
}

.max-height {
  height: max-content;
  @media screen and (min-width: 992px) {
    max-height: 90vh;
  }
}
</style>
