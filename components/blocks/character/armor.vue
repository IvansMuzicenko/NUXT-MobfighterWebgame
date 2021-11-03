<template>
  <section>
    <h4>Armor:</h4>
    <ul class="frame p-2">
      <blocks-character-part
        :part="armor.head"
        label="Head"
        @unequipItem="unequipItem"
      />
      <blocks-character-part
        :part="armor.shoulder"
        label="Shoulder"
        @unequipItem="unequipItem"
      />
      <blocks-character-part
        :part="armor.chest"
        label="Chest"
        @unequipItem="unequipItem"
      />
      <blocks-character-part
        :part="armor.arms"
        label="Arms"
        @unequipItem="unequipItem"
      />
      <blocks-character-part
        :part="armor.leggins"
        label="Leggins"
        @unequipItem="unequipItem"
      />
      <blocks-character-part
        :part="armor.boots"
        label="Boots"
        @unequipItem="unequipItem"
      />
    </ul>
  </section>
</template>

<script>
export default {
  computed: {
    armor() {
      return this.$store.getters.character.equipment.armor
    },
  },
  methods: {
    unequipItem(item) {
      this.$store.dispatch('unequipItem', item)
    },
  },
}
</script>
