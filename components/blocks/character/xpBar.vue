<template>
  <div class="xpBar d-flex" :style="xpBar">
    <span class="barSection frame"></span>
    <span class="barSection frame"></span>
    <span class="barSection frame"></span>
    <span class="barSection frame"></span>
    <span class="barSection frame"></span>
    <span class="barSection frame"></span>
    <span class="barSection frame"></span>
    <span class="barSection frame"></span>
    <span class="barSection frame"></span>
    <span class="barSection frame"></span>
  </div>
</template>

<script>
export default {
  computed: {
    character() {
      return this.$store.getters.character
    },
    xpBar() {
      return `background: linear-gradient(to right, rgb(125, 0, 125) ${
        (this.character.xp * 100) / this.character.reqXp
      }%, transparent 0)`
    },
  },
}
</script>

<style lang="scss" scoped>
.xpBar {
  width: 100%;
  height: 1rem;
  background: rgba(0, 0, 0, 0);
}
.barSection {
  width: calc(10% - 6px);
}
</style>
