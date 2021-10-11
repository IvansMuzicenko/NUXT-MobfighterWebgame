<template>
  <div class="max-height frame mx-3 w-90vw w-45vw-lg">
    <section class="p-2">
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
        <li>
          Mana: {{ character.depStats.MP }}/{{ character.depStats.maxMP }}
        </li>
        <li>Attack Power: {{ character.depStats.attackPower }}</li>
        <li>Defence Power: {{ character.depStats.defPower }}</li>
        <li>Spell Power: {{ character.depStats.spellPower }}</li>

        <li>Armor: {{ character.stats.ARMOR }}</li>
        <li>Strength: {{ character.stats.STR }}</li>
        <li>Agility: {{ character.stats.AGI }}</li>
        <li>Intelligence: {{ character.stats.INT }}</li>
      </ul>

      <h4>Armor:</h4>
      <ul class="frame p-2">
        <li>
          Head:
          <span v-if="armor.head == null"> none</span>
          <span v-else>
            <span class="armor"> armor: {{ armor.head.stats.ARMOR }}</span
            ><span v-if="armor.head.stats.STR != 0" class="str">
              , strength: {{ armor.head.stats.STR }}</span
            ><span v-if="armor.head.stats.AGI != 0" class="agi">
              , agility: {{ armor.head.stats.AGI }}</span
            ><span v-if="armor.head.stats.INT != 0" class="int">
              , intelligence: {{ armor.head.stats.INT }}</span
            >
            <ui-base-button
              class="outline--small"
              @click="unequipItem(armor.head)"
              >Unequip</ui-base-button
            >
          </span>
        </li>
        <li>
          Shoulder:
          <span v-if="armor.shoulder == null"> none</span>
          <span v-else>
            <span class="armor"> armor: {{ armor.shoulder.stats.ARMOR }}</span
            ><span v-if="armor.shoulder.stats.STR != 0" class="str">
              , strength: {{ armor.shoulder.stats.STR }}</span
            ><span v-if="armor.shoulder.stats.AGI != 0" class="agi">
              , agility: {{ armor.shoulder.stats.AGI }}</span
            ><span v-if="armor.shoulder.stats.INT != 0" class="int">
              , intelligence: {{ armor.shoulder.stats.INT }}</span
            >
            <ui-base-button
              class="outline--small"
              @click="unequipItem(armor.shoulder)"
              >Unequip</ui-base-button
            >
          </span>
        </li>
        <li>
          Chest:
          <span v-if="armor.chest == null"> none</span>
          <span v-else>
            <span class="armor"> armor: {{ armor.chest.stats.ARMOR }}</span
            ><span v-if="armor.chest.stats.STR != 0" class="str">
              , strength: {{ armor.chest.stats.STR }}</span
            ><span v-if="armor.chest.stats.AGI != 0" class="agi">
              , agility: {{ armor.chest.stats.AGI }}</span
            ><span v-if="armor.chest.stats.INT != 0" class="int">
              , intelligence: {{ armor.chest.stats.INT }}</span
            >
            <ui-base-button
              class="outline--small"
              @click="unequipItem(armor.chest)"
              >Unequip</ui-base-button
            >
          </span>
        </li>
        <li>
          Arms:
          <span v-if="armor.arms == null"> none</span>
          <span v-else>
            <span class="armor"> armor: {{ armor.arms.stats.ARMOR }}</span
            ><span v-if="armor.arms.stats.STR != 0" class="str">
              , strength: {{ armor.arms.stats.STR }}</span
            ><span v-if="armor.arms.stats.AGI != 0" class="agi">
              , agility: {{ armor.arms.stats.AGI }}</span
            ><span v-if="armor.arms.stats.INT != 0" class="int">
              , intelligence: {{ armor.arms.stats.INT }}</span
            >
            <ui-base-button
              class="outline--small"
              @click="unequipItem(armor.arms)"
              >Unequip</ui-base-button
            >
          </span>
        </li>
        <li>
          Leggins:
          <span v-if="armor.leggins == null"> none</span>
          <span v-else>
            <span class="armor"> armor: {{ armor.leggins.stats.ARMOR }}</span
            ><span v-if="armor.leggins.stats.STR != 0" class="str">
              , strength: {{ armor.leggins.stats.STR }}</span
            ><span v-if="armor.leggins.stats.AGI != 0" class="agi">
              , agility: {{ armor.leggins.stats.AGI }}</span
            ><span v-if="armor.leggins.stats.INT != 0" class="int">
              , intelligence: {{ armor.leggins.stats.INT }}</span
            >
            <ui-base-button
              class="outline--small"
              @click="unequipItem(armor.leggins)"
              >Unequip</ui-base-button
            >
          </span>
        </li>
        <li>
          Boots:
          <span v-if="armor.boots == null"> none</span>
          <span v-else>
            <span class="armor"> armor: {{ armor.boots.stats.ARMOR }}</span
            ><span v-if="armor.boots.stats.STR != 0" class="str">
              , strength: {{ armor.boots.stats.STR }}</span
            ><span v-if="armor.boots.stats.AGI != 0" class="agi">
              , agility: {{ armor.boots.stats.AGI }}</span
            ><span v-if="armor.boots.stats.INT != 0" class="int">
              , intelligence: {{ armor.boots.stats.INT }}</span
            >
            <ui-base-button
              class="outline--small"
              @click="unequipItem(armor.boots)"
              >Unequip</ui-base-button
            >
          </span>
        </li>
      </ul>

      <h4>Weapons:</h4>
      <ul class="frame p-2">
        <h4>1st set:</h4>
        <div :hidden="weapon.THand !== null">
          <li>
            Left hand:
            <span v-if="weapon.LHand == null"> none</span>
            <span v-else>
              <span v-if="weapon.LHand.stats.attackPower != 0">
                Attack Power: {{ weapon.LHand.stats.attackPower }}</span
              >
              <span v-if="weapon.LHand.stats.spellPower != 0">
                Spell Power: {{ weapon.LHand.stats.spellPower }}</span
              >
              <ui-base-button
                class="outline--small"
                @click="unequipItem(weapon.LHand)"
                >Unequip</ui-base-button
              >
            </span>
          </li>
          <li>
            Right hand:
            <span v-if="weapon.RHand == null"> none</span>
            <span v-else>
              <span v-if="weapon.RHand.stats.attackPower != 0">
                Attack Power: {{ weapon.RHand.stats.attackPower }}</span
              >
              <span v-if="weapon.RHand.stats.spellPower != 0">
                Spell Power: {{ weapon.RHand.stats.spellPower }}</span
              >
              <ui-base-button
                class="outline--small"
                @click="unequipItem(weapon.RHand)"
                >Unequip</ui-base-button
              >
            </span>
          </li>
        </div>
        <div :hidden="weapon.LHand !== null || weapon.RHand !== null">
          <li>
            Two-hand:
            <span v-if="weapon.THand == null"> none</span>
            <span v-else>
              <span v-if="weapon.THand.stats.attackPower != 0">
                Attack Power: {{ weapon.THand.stats.attackPower }}</span
              >
              <span v-if="weapon.THand.stats.spellPower != 0">
                Spell Power: {{ weapon.THand.stats.spellPower }}</span
              >
              <ui-base-button
                class="outline--small"
                @click="unequipItem(weapon.THand)"
                >Unequip</ui-base-button
              >
            </span>
          </li>
        </div>
        <li>
          Reserve: <span v-if="weapon.reserve == null"> none</span>
          <span v-else>
            <span v-if="weapon.reserve.stats.attackPower != 0">
              Attack Power: {{ weapon.reserve.stats.attackPower }}</span
            >
            <ui-base-button
              class="outline--small"
              @click="unequipItem(weapon.reserve)"
              >Unequip</ui-base-button
            >
          </span>
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
    armor() {
      return this.$store.getters.character.equipment.armor
    },
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
.max-height {
  height: max-content;
  @media screen and (min-width: 992px) {
    max-height: 90vh;
  }
}

ul {
  list-style: none;
}
</style>
