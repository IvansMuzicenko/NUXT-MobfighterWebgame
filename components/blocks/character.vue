<template>
  <div class="relative max-height frame px-8 pt-12">
    <img src="/banner-lg.png" class="absolute left-0 top-0 w-full" />
    <h2 class="absolute left-0 top-1 w-full text-center text-xl">Character</h2>
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
