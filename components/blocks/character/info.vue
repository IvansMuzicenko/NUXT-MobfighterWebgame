<template>
  <section>
    <p class="text-center">{{ character.nickname }}, LvL {{ character.lvl }}</p>
    <p class="text-center">XP :{{ character.xp }}/{{ character.reqXp }}</p>
    <blocks-character-bar :value="character.xp" :max-value="character.reqXp" />

    <h4>Stats:</h4>
    <ul class="p-2 sm:flex frame">
      <section class="sm:w-1/2">
        <li>
          Health: {{ character.depStats.HP }}/{{ character.depStats.maxHP }}
        </li>
        <li>
          Mana: {{ character.depStats.MP }}/{{ character.depStats.maxMP }}
        </li>
        <li>Attack Power: {{ character.depStats.attackPower }}</li>
        <li>Defence Power: {{ character.depStats.defPower }}</li>
        <li>Spell Power: {{ character.depStats.spellPower }}</li>
      </section>

      <section class="sm:w-1/2">
        <li>Armor: {{ character.stats.ARMOR }}</li>
        <li>Strength: {{ character.stats.STR }}</li>
        <li>Agility: {{ character.stats.AGI }}</li>
        <li>Intelligence: {{ character.stats.INT }}</li>
      </section>
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
