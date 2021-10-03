<template>
  <button v-if="!link" :type="type" class="button">
    <slot></slot>
  </button>
  <nuxt-link v-else :to="to" class="button">
    <slot></slot>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: false,
      default: null,
    },
    link: {
      type: Boolean,
      required: false,
      default: false,
    },
    to: {
      type: String,
      required: false,
      default: '/',
    },
  },
}
</script>

<style lang="scss" scoped>
.button {
  // background-size: cover;
  // border-image: url('/frame.png') 30;
  text-decoration: none;
  font: inherit;
  border: 3px solid #4e3500;
  cursor: pointer;
  display: inline-block;
  text-shadow: 0 0 2rem white, 1px 1px 2rem white, -1px -1px 2rem white;
  box-shadow: 0 0 2rem 0.2rem #4e3500;
  &:hover,
  &:active {
    background-color: #4e3500;
    color: white;
  }
  &.outline {
    // background-size: cover;
    // border-image: url('/frame.png') 30;
    border: 3px solid #4e3500;
    padding: 1rem;
    color: black;
    &:hover,
    &:active {
      background-color: #4e3500;
      color: white;
    }
  }
  &.filled {
    // background-size: cover;
    // border-image: url('/frame.png') 30;
    background-color: #4e3500;
    border: 3px solid black;
    color: white;
    padding: 1rem;
    box-shadow: inset 0 0 2rem 0.2rem rgba(0, 0, 0, 0.75);
    &:hover,
    &:active {
      background-color: rgba(0, 0, 0, 0);
      color: black;
    }
  }
}
</style>
