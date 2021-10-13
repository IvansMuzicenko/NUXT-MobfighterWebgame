<template>
  <section>
    <h4>Weapons:</h4>
    <ul class="frame p-2">
      <div :hidden="weapon.THand !== null">
        <blocks-character-weapon-part
          :part="weapon.LHand"
          label="Left hand"
          @unequipItem="unequipItem"
        />
        <blocks-character-weapon-part
          :part="weapon.RHand"
          label="Right hand"
          @unequipItem="unequipItem"
        />
      </div>
      <div :hidden="weapon.LHand !== null || weapon.RHand !== null">
        <blocks-character-weapon-part
          :part="weapon.THand"
          label="Two hand"
          @unequipItem="unequipItem"
        />
      </div>
      <blocks-character-weapon-part
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

<style lang="scss" scoped>
ul {
  list-style: none;
}
</style>
