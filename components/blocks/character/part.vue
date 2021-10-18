<template>
  <li>
    <span v-if="part" :class="part.rarity">{{ label }}: </span>
    <span v-if="part == null">{{ label }}: none</span>
    <span v-else>
      <span v-if="part.stats.ARMOR" class="armor">
        armor: {{ part.stats.ARMOR }}</span
      >
      <span v-if="part.stats.STR" class="str">
        , strength: {{ part.stats.STR }}
      </span>
      <span v-if="part.stats.AGI" class="agi">
        , agility: {{ part.stats.AGI }}
      </span>
      <span v-if="part.stats.INT" class="int">
        , intelligence: {{ part.stats.INT }}
      </span>
      <span v-if="part.stats.attackPower" class="str">
        Attack Power: {{ part.stats.attackPower }}</span
      >
      <span v-if="part.stats.spellPower" class="int">
        Spell Power: {{ part.stats.spellPower }}</span
      >
      <ui-base-button class="outline--small" @click="unequipItem()">
        Unequip
      </ui-base-button>
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
