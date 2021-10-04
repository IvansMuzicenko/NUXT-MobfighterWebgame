<template>
  <div class="max-height frame mx-3 w-90vw w-40vw-lg">
    <section class="p-2">
      <p class="d-flex justify-content-center">
        Hero {{ nickname }}, LvL {{ character.lvl }}
      </p>
      <p class="d-flex justify-content-center">
        XP :{{ character.xp }}/{{ character.reqXp }}
      </p>

      <h4>Stats:</h4>
      <ul class="frame p-2">
        <li>Health: {{ stats.HP }}</li>
        <li>Mana: {{ stats.MP }}</li>
        <li>Armor: {{ stats.ARMOR }}</li>
        <li>Strength: {{ stats.STR }}</li>
        <li>Agility: {{ stats.AGI }}</li>
        <li>Intelligence: {{ stats.INT }}</li>
      </ul>

      <h4>Armor:</h4>
      <ul class="frame p-2">
        <li>Head: {{ armor.head }}</li>
        <li>Neck: {{ armor.neck }}</li>
        <li>Shoulder: {{ armor.shoulder }}</li>
        <li>Chest: {{ armor.chest }}</li>
        <li>Arms: {{ armor.arms }}</li>
        <li>Leggins: {{ armor.leggins }}</li>
        <li>Boots: {{ armor.boots }}</li>
        <li>Ring: {{ armor.ring }}</li>
      </ul>

      <h4>Weapons:</h4>
      <ul class="frame p-2">
        <li>
          <h4>1st set:</h4>
          <ul>
            <li>Left hand: {{ weapon.fstLHand }}</li>
            <li>Right hand: {{ weapon.fstRHand }}</li>
          </ul>
        </li>
        <li>
          <h4>2nd set:</h4>
          <ul>
            <li>Left hand: {{ weapon.sndLHand }}</li>
            <li>Right hand: {{ weapon.sndRHand }}</li>
          </ul>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
export default {
  computed: {
    character() {
      return this.$store.getters.character
    },
    nickname() {
      return this.$store.getters.nickname
    },
    stats() {
      return this.$store.getters.stats
    },
    armor() {
      return this.$store.getters.armor
    },
    weapon() {
      return this.$store.getters.weapon
    },
  },
}
</script>

<style lang="scss" scoped>
.max-height {
  height: max-content;
  @media screen and (min-width: 992px) {
    max-height: 80vh;
  }
}
.frame {
  text-shadow: 0 0 2rem white, 1px 1px 2rem white, -1px -1px 2rem white;
  box-shadow: 0 0 2rem 0.2rem #4e3500;
  border: 3px solid #4e3500;
}
ul {
  list-style: none;
}
</style>
