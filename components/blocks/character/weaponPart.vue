<template>
  <li>
    <span v-if="part" :class="part.rarity">{{ label }}: </span>
    <span v-if="part == null">{{ label }}: none</span>
    <span v-else>
      <span v-if="part.stats.attackPower != 0" class="str">
        Attack Power: {{ part.stats.attackPower }}</span
      >
      <span v-if="part.stats.spellPower != 0" class="int">
        Spell Power: {{ part.stats.spellPower }}</span
      >
      <ui-base-button class="outline--small" @click="unequipItem()"
        >Unequip</ui-base-button
      >
    </span>
  </li>
</template>

<script>
export default {
  props: {
    part: {
      type: Object,
      required: false,
      default: null,
    },
    label: {
      type: String,
      required: true,
    },
  },
  methods: {
    unequipItem() {
      this.$emit('unequipItem', this.part)
    },
  },
}
</script>
