<template>
  <div>
    <h2 class="d-flex justify-content-center">Battle Board</h2>
    <p>
      Prepare your self for battle, hero. Sometimes the enemies will be weak,
      but it won't be always. Gain battle experience, earn new armor and try not
      to die. (everytime you won, you will gain XP and random item of enemy
      level)
    </p>
    <!-- <blocks-battle-map></blocks-battle-map> -->
    <ui-base-button v-if="HP > 0" link :to="`fight?lvl=${lvl}&difficulty=easy`"
      >Fight!</ui-base-button
    >
  </div>
</template>

<script>
export default {
  computed: {
    lvl() {
      return this.$store.getters.character.lvl
    },
    HP() {
      return this.$store.getters.character.depStats.HP
    },
  },
}
</script>
