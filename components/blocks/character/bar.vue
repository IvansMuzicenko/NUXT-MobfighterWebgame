<template>
  <div class="bar d-flex" :style="bar">
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
      return `background: linear-gradient(to right, ${this.color} ${
        (this.value * 100) / this.maxValue
      }%, transparent 0)`
    },
  },
}
</script>

<style lang="scss" scoped>
.bar {
  width: 100%;
  height: 1rem;
  background: rgba(0, 0, 0, 0);
}
.barSection {
  width: calc(10% - 6px);
}
</style>
