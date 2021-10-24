<template>
  <div class="relative bg-transparent w-full h-4 flex">
    <span v-for="i in 10" :key="i" class="barSection frame"></span>
    <div class="absolute h-full filler" :style="bar"></div>
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
.filler {
  transition: width 1s;
}
.barSection {
  z-index: 1;
  width: 10%;
}
</style>
