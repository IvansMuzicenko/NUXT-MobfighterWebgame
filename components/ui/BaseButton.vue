<template>
  <button v-if="!link" :type="mode" :class="classes">
    <slot></slot>
  </button>
  <nuxt-link v-else :to="to" :class="classes">
    <slot></slot>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    classes: {
      type: String,
      required: false,
      default: null,
    },
    mode: {
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
button,
a {
  // background-size: cover;
  // border-image: url('/frame.png') 30;
  text-decoration: none;
  font: inherit;
  border: 3px solid #4e3500;
  color: white;
  cursor: pointer;
  display: inline-block;
  &:hover,
  &:active {
    background-color: #4e3500;
    color: white;
  }
}
.outline {
  // background-size: cover;
  // border-image: url('/frame.png') 30;
  border: 3px solid #4e3500;
  padding: 1rem;
  &:hover,
  &:active {
    background-color: #4e3500;
    color: white;
  }
}
.filled {
  // background-size: cover;
  // border-image: url('/frame.png') 30;
  border: 3px solid black;
  padding: 1rem;
  &:hover,
  &:active {
    background-color: #4e3500;
    color: white;
  }
}
.shadow-text {
  text-shadow: 0 0 2rem white, 1px 1px 2rem white, -1px -1px 2rem white;
}
.shadow-box {
  box-shadow: 0 0 2rem 0.2rem rgba(0, 0, 0, 0.75);
}
</style>
