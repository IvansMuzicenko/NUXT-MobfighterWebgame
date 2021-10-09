<template>
  <button
    v-if="!link"
    :type="type"
    class="button"
    :disabled="disabled"
    @click="click"
  >
    <slot></slot>
  </button>
  <nuxt-link v-else :to="to" class="button" :disabled="disabled">
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
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  methods: {
    click() {
      this.$emit('click')
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
  cursor: pointer;
  display: inline-block;
  text-shadow: 0 0 2rem white, 1px 1px 2rem white, -1px -1px 2rem white;
  box-shadow: 0 0 2rem 0.2rem #4e3500;
  &:disabled {
    background: grey !important;
    cursor: not-allowed;
  }
  &.outline {
    // background-size: cover;
    // border-image: url('/frame.png') 30;
    background-color: rgba(0, 0, 0, 0);
    border: 3px solid #4e3500;
    padding: 0.5rem;
    color: black;

    &:not([disabled]):hover,
    &:not([disabled]):active {
      background-color: #4e3500;
      color: white;
    }
    &--small {
      background-color: rgba(0, 0, 0, 0);
      border: 1px solid #4e3500;
      &:not([disabled]):hover,
      &:not([disabled]):active {
        background-color: #4e3500;
        color: white;
      }
    }
    &--large {
      background-color: rgba(0, 0, 0, 0);
      border: 3px solid #4e3500;
      padding: 1rem;

      &:not([disabled]):hover,
      &:not([disabled]):active {
        background-color: #4e3500;
        color: white;
      }
    }
  }
  &.filled {
    // background-size: cover;
    // border-image: url('/frame.png') 30;
    background-color: #4e3500;
    border: 3px solid black;
    color: white;
    padding: 0.5rem;
    box-shadow: inset 0 0 2rem 0.2rem rgba(0, 0, 0, 0.75);
    &:not([disabled]):hover,
    &:not([disabled]):active {
      background-color: rgba(0, 0, 0, 0);
      color: black;
    }
    &--small {
      background-color: #4e3500;
      border: 1px solid black;
      &:not([disabled]):hover,
      &:not([disabled]):active {
        background-color: rgba(0, 0, 0, 0);
        color: black;
      }
    }
    &--large {
      background-color: #4e3500;
      border: 3px solid black;
      padding: 1rem;
      &:not([disabled]):hover,
      &:not([disabled]):active {
        background-color: rgba(0, 0, 0, 0);
        color: black;
      }
    }
  }
}
</style>
