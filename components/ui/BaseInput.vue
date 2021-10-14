<template>
  <div>
    <label :for="id">
      <slot></slot>
    </label>
    <input :id="id" v-model="innerValue" :type="type" :value="value" />
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: false,
      default: 'text',
    },
    value: {
      type: String,
      required: false,
      default: null,
    },
  },
  computed: {
    innerValue: {
      set(value) {
        this.$emit('input', value)
      },
      get() {
        return this.value
      },
    },
  },
}
</script>
