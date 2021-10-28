<template>
  <section>
    <h4>Weapons:</h4>
    <ul class="p-2 frame">
      <div :hidden="weapon.twoHand !== null">
        <blocks-character-part
          :part="weapon.offHand"
          label="Off-hand"
          @unequipItem="unequipItem"
        />
        <blocks-character-part
          :part="weapon.mainHand"
          label="Main hand"
          @unequipItem="unequipItem"
        />
      </div>
      <div :hidden="weapon.offHand !== null || weapon.mainHand !== null">
        <blocks-character-part
          :part="weapon.twoHand"
          label="Two hand"
          @unequipItem="unequipItem"
        />
      </div>
      <blocks-character-part
        :part="weapon.reserve"
        label="Reserve"
        @unequipItem="unequipItem"
      />
    </ul>
  </section>
</template>

<script>
export default {
  computed: {
    weapon() {
      return this.$store.getters.character.equipment.weapon
    },
  },
  methods: {
    unequipItem(item) {
      this.$store.dispatch('unequipItem', item)
    },
  },
}
</script>
