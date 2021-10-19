<template>
  <div class="bar d-flex">
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
    <div class="filler" :style="bar"></div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      required: true,
    },
    maxValue: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      default: 'rgb(125, 0, 125)',
    },
  },
  computed: {
    character() {
      return this.$store.getters.character
    },
    bar() {
      return `width: ${(this.value * 100) / this.maxValue}%; background: ${
        this.color
      }`
    },
  },
}
</script>

<style lang="scss" scoped>
.bar {
  width: 100%;
  height: 1rem;
  background: rgba(0, 0, 0, 0);
  position: relative;
}
.filler {
  position: absolute;
  height: 100%;
  transition: width 1s;
  z-index: 0;
}
.barSection {
  width: calc(10% - 6px);
  z-index: 1;
}
</style>
