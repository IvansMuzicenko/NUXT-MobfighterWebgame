<template>
  <div>
    <p v-if="winner === 'hero'">
      Congratulations, {{ character.nickname }}! You won the battle and earn
      some rewards:
    </p>
    <p v-if="winner === 'enemy'">
      Wake up, {{ character.nickname }}! You lost the battle, but not a whole
      war. Recover yourself and fight on!
    </p>
    <p v-if="winner === 'draw'">
      Wake up, {{ character.nickname }}! You lost the battle, but your enemy
      defeated too. Here is some rewards for you:
    </p>
    <div class="frame">
      <section v-if="rewards.xp != null" class="w-full frame">
        Experience: {{ rewards.xp }}
      </section>
      <section v-if="rewards.money != null" class="w-full frame">
        Money: {{ rewards.money }} monets
      </section>
      <section v-if="rewards.item != null" class="w-full frame">
        Item:
        <span :class="rewards.item.rarity">
          {{ rewards.item.type }}: {{ rewards.item.rarity }}
          {{ rewards.item.name }} -
        </span>
        <span
          v-if="rewards.item.stats.ARMOR && rewards.item.stats.ARMOR != 0"
          class="armor"
        >
          armor: {{ rewards.item.stats.ARMOR }}</span
        ><span
          v-if="rewards.item.stats.STR && rewards.item.stats.STR != 0"
          class="str"
        >
          strength: {{ rewards.item.stats.STR }}</span
        ><span
          v-if="rewards.item.stats.AGI && rewards.item.stats.AGI != 0"
          class="agi"
        >
          agility: {{ rewards.item.stats.AGI }}</span
        ><span
          v-if="rewards.item.stats.INT && rewards.item.stats.INT != 0"
          class="int"
        >
          intelligence: {{ rewards.item.stats.INT }}</span
        >
        <span
          v-if="
            rewards.item.stats.attackPower &&
            rewards.item.stats.attackPower != 0
          "
          class="str"
        >
          attack power: {{ rewards.item.stats.attackPower }}</span
        >
        <span
          v-if="
            rewards.item.stats.spellPower && rewards.item.stats.spellPower != 0
          "
          class="int"
        >
          spell power: {{ rewards.item.stats.spellPower }}</span
        >
        <div>
          <ui-base-button
            class="outline--small"
            :disabled="!rewards.item.key"
            @click="equipItem(rewards.item)"
            >Equip</ui-base-button
          >

          <span>
            Cost:
            {{ Math.ceil(rewards.item.cost / 2) }}
            monets
          </span>
        </div>
      </section>
    </div>
    <ui-base-button link to="/character" class="outline"
      >Character</ui-base-button
    >
  </div>
</template>

<script>
export default {
  props: {
    winner: {
      type: String,
      required: true,
    },
    rewards: {
      type: Object,
      required: false,
      default: null,
    },
  },
  computed: {
    character() {
      return this.$store.getters.character
    },
  },
  methods: {
    sellItem(sellItem) {
      this.$store.dispatch('sellItem', sellItem)
      this.$router.push('/character')
    },
    equipItem(equipItem) {
      this.$store.dispatch('equipItem', equipItem)
      this.$router.push('/character')
    },
  },
}
</script>
