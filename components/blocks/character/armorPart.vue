<template>
  <li>
    <span v-if="part" :class="part.rarity">{{ label }}: </span>
    <span v-if="part == null">{{ label }}: none</span>
    <span v-else>
      <span class="armor"> armor: {{ part.stats.ARMOR }}</span>
      <span v-if="part.stats.STR != 0" class="str">
        , strength: {{ part.stats.STR }}
      </span>
      <span v-if="part.stats.AGI != 0" class="agi">
        , agility: {{ part.stats.AGI }}
      </span>
      <span v-if="part.stats.INT != 0" class="int">
        , intelligence: {{ part.stats.INT }}
      </span>
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
