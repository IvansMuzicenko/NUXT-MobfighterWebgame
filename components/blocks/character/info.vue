<template>
  <section>
    <p class="d-flex justify-content-center">
      Hero {{ character.nickname }}, LvL {{ character.lvl }}
    </p>
    <p class="d-flex justify-content-center">
      XP :{{ character.xp }}/{{ character.reqXp }}
    </p>

    <h4>Stats:</h4>
    <ul class="frame p-2">
      <li>
        Health: {{ character.depStats.HP }}/{{ character.depStats.maxHP }}
      </li>
      <li>Mana: {{ character.depStats.MP }}/{{ character.depStats.maxMP }}</li>
      <li>Attack Power: {{ character.depStats.attackPower }}</li>
      <li>Defence Power: {{ character.depStats.defPower }}</li>
      <li>Spell Power: {{ character.depStats.spellPower }}</li>

      <li>Armor: {{ character.stats.ARMOR }}</li>
      <li>Strength: {{ character.stats.STR }}</li>
      <li>Agility: {{ character.stats.AGI }}</li>
      <li>Intelligence: {{ character.stats.INT }}</li>
    </ul>
  </section>
</template>

<script>
export default {
  computed: {
    character() {
      return this.$store.getters.character
    },
  },
}
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
}
</style>
