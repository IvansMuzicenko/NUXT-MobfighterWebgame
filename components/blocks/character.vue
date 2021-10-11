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
          <span v-if="armor.head" :class="armor.head.rarity">Head: </span>
          <span v-if="armor.head == null">Head: none</span>
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
          <span v-if="armor.shoulder" :class="armor.shoulder.rarity"
            >Shoulder:
          </span>
          <span v-if="armor.shoulder == null">Shoulder: none</span>
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
          <span v-if="armor.chest" :class="armor.chest.rarity">Chest: </span>
          <span v-if="armor.chest == null">Chest: none</span>
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
          <span v-if="armor.arms" :class="armor.arms.rarity">Arms: </span>
          <span v-if="armor.arms == null">Arms: none</span>
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
          <span v-if="armor.leggins" :class="armor.leggins.rarity"
            >Leggins:
          </span>
          <span v-if="armor.leggins == null">Leggins: none</span>
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
          <span v-if="armor.boots" :class="armor.boots.rarity">Boots: </span>
          <span v-if="armor.boots == null">Boots: none</span>
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
        <div :hidden="weapon.THand !== null">
          <li>
            <span v-if="weapon.LHand" :class="weapon.LHand.rarity"
              >Left hand:
            </span>
            <span v-if="weapon.LHand == null">Left hand: none</span>
            <span v-else>
              <span v-if="weapon.LHand.stats.attackPower != 0" class="str">
                Attack Power: {{ weapon.LHand.stats.attackPower }}</span
              >
              <span v-if="weapon.LHand.stats.spellPower != 0" class="int">
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
            <span v-if="weapon.RHand" :class="weapon.RHand.rarity"
              >Right hand:
            </span>
            <span v-if="weapon.RHand == null">Right hand: none</span>
            <span v-else>
              <span v-if="weapon.RHand.stats.attackPower != 0" class="str">
                Attack Power: {{ weapon.RHand.stats.attackPower }}</span
              >
              <span v-if="weapon.RHand.stats.spellPower != 0" class="int">
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
            <span v-if="weapon.THand" :class="weapon.THand.rarity"
              >Two hand:
            </span>
            <span v-if="weapon.THand == null">Two hand: none</span>
            <span v-else>
              <span v-if="weapon.THand.stats.attackPower != 0" class="str">
                Attack Power: {{ weapon.THand.stats.attackPower }}</span
              >
              <span v-if="weapon.THand.stats.spellPower != 0" class="int">
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
          <span v-if="weapon.reserve" :class="weapon.reserve.rarity"
            >Reserve:
          </span>
          <span v-if="weapon.reserve == null">Reserve: none</span>
          <span v-else>
            <span v-if="weapon.reserve.stats.attackPower != 0" class="str">
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
.common {
  color: rgb(20, 20, 20);
}

.rare {
  color: rgb(0, 100, 255);
}

.epic {
  color: rgb(220, 0, 220);
}

.legendary {
  color: rgb(255, 125, 0);
}
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
