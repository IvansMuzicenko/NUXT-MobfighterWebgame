<template>
  <div>
    <h3 class="text-center">Fight!</h3>
    <h4 class="text-center">Turn {{ battle.turn }}</h4>
    <div v-if="battle.phase != 'end'" class="frame flex">
      <section class="frame">
        <div>
          <span class="text-center">
            {{ character.nickname }}
          </span>
          <span class="text-center">
            HP: {{ battle.hero.HP }}/{{ character.depStats.maxHP }}
          </span>
          <blocks-character-bar
            :value="battle.hero.HP"
            :max-value="character.depStats.maxHP"
            color="red"
          />
        </div>
        <div>
          {{ battle.phase }}
          <section v-if="battle.phase === 'defence'">
            <span class="text-center"> Choose defence </span>
            <div class="flex">
              <ui-base-button class="outline--small" @click="defence('none')"
                >None</ui-base-button
              >
              <ui-base-button class="outline--small" @click="defence('block')"
                >Block</ui-base-button
              >
              <ui-base-button class="outline--small" @click="defence('dodge')"
                >Dodge</ui-base-button
              >
              <ui-base-button
                class="outline--small"
                @click="defence('counterattack')"
              >
                Counterattack
              </ui-base-button>
            </div>
          </section>
          <section v-if="battle.phase === 'attack'">
            <span class="text-center"> Choose attack </span>
            <ui-base-button class="outline--small" @click="attack('attack')"
              >Attack with weapon</ui-base-button
            >
            <ui-base-button class="outline--small" @click="attack('spell')"
              >Choose spell</ui-base-button
            >
          </section>
          <section v-if="battle.phase === 'action'">
            <span class="text-center"> Choose action </span>
            <ui-base-button class="outline--small" @click="action('use')"
              >Use item</ui-base-button
            >
            <ui-base-button class="outline--small" @click="action('rest')"
              >Rest</ui-base-button
            >
          </section>
        </div>
      </section>

      <section class="frame">
        <div>
          <span class="text-center">
            {{ battle.enemy.name }}
          </span>
          <span class="text-center"
            >HP: {{ battle.enemy.HP }}/{{ battle.enemy.maxHP }}</span
          >
          <blocks-character-bar
            :value="battle.enemy.HP"
            :max-value="battle.enemy.maxHP"
            color="red"
          />
        </div>
      </section>
    </div>
    <blocks-battle-end
      v-if="battle.phase == 'end'"
      :winner="battle.winner"
      :rewards="battle.rewards"
    />
    <!-- add statistics of attacks, dodges e.t.c -->
  </div>
</template>

<script>
export default {
  middleware({ store, redirect, route }) {
    if (route.query.minlvl > store.getters.character.lvl) {
      return redirect('/battle-board')
    }
  },
  data() {
    return {
      battle: {
        lvl: this.$route.query.lvl,
        minLVL: this.$route.query.minlvl,
        maxLVL: this.$route.query.maxlvl,
        difficulty: 1,
        turn: 1,
        phase: 'defence',
        hero: {
          HP: this.$store.getters.character.depStats.HP,
          chooses: {
            defence: '',
            attack: '',
            action: '',
          },
          attackBonus: 0,
        },
        enemy: {
          attrs: null,
          name: 'Enemy',
          maxHP: 100,
          HP: 100,
          maxMP: 0,
          MP: 0,
          ARMOR: 0,
          attackPower: 1,
          defPower: 0,
          spellPower: 0,
          chooses: {
            defence: '',
            attack: '',
            action: '',
          },
          attackBonus: 0,
        },
        firstAttack: '',
        winner: '',
        rewards: {
          xp: null,
          item: null,
        },
      },
    }
  },
  computed: {
    character() {
      return this.$store.getters.character
    },
  },

  mounted() {
    if (this.battle.lvl <= this.battle.maxLVL) {
      this.battle.enemy.attrs = this.battle.lvl * 6
    } else {
      this.battle.enemy.attrs = this.battle.maxLVL * 6
      this.battle.lvl = this.battle.maxLVL
    }

    this.battle.enemy.HP = this.battle.enemy.maxHP
    this.battle.enemy.MP = this.battle.enemy.maxMP

    if (this.$route.query.difficulty === 'medium') {
      this.battle.difficulty = 1.5
    } else if (this.$route.query.difficulty === 'hard') {
      this.battle.difficulty = 2
    }
    this.battle.enemy.attrs = (
      this.battle.enemy.attrs * this.battle.difficulty
    ).toFixed()

    this.battle.enemy.ARMOR = this.battle.lvl * 6
    this.battle.enemy.attackPower =
      this.battle.lvl * (2 + Math.random().toFixed() * 0.5)
    for (let i = 0; i < this.battle.enemy.attrs; i++) {
      const randStat = Math.floor(Math.random() * 3)
      if (randStat === 0) {
        this.battle.enemy.maxHP += 5
        this.battle.enemy.HP = this.battle.enemy.maxHP
        this.battle.enemy.attackPower += 1
      } else if (randStat === 1) {
        this.battle.enemy.maxMP += 5
        this.battle.enemy.MP = this.battle.enemy.maxMP
        this.battle.enemy.spellPower += 1
      } else {
        this.battle.enemy.ARMOR += 1
        this.battle.enemy.defPower += 1
      }
    }
  },

  methods: {
    defence(choice) {
      this.battle.hero.chooses.defence = choice
      if (choice === 'none') {
        this.battle.hero.attackBonus = this.character.depStats.defPower
      }
      this.battle.phase = 'attack'
    },
    attack(choice) {
      this.battle.hero.chooses.attack = choice
      this.battle.phase = 'action'
    },
    action(choice) {
      this.battle.hero.chooses.action = choice
      this.battle.phase = 'enemyTurn'
      this.enemyTurn()
    },
    enemyTurn() {
      const defRand = Math.floor(Math.random() * 4)
      if (defRand === 0) {
        this.battle.enemy.chooses.defence = 'none'
        this.battle.enemy.attackBonus = this.battle.enemy.defPower
      } else if (defRand === 1) {
        this.battle.enemy.chooses.defence = 'block'
      } else if (defRand === 2) {
        this.battle.enemy.chooses.defence = 'dodge'
      } else {
        this.battle.enemy.chooses.defence = 'counterAttack'
      }
      this.battle.enemy.chooses.attack = 'attack'
      this.battle.enemy.chooses.action = 'rest'
      this.battle.phase = 'fight'
      this.fightActions()
    },
    heroHit(resistance) {
      const enemy = this.battle.enemy
      const hero = this.battle.hero
      let damage =
        this.character.depStats.attackPower +
        hero.attackBonus -
        Number(resistance)
      if (damage < 0) damage = 0
      enemy.HP -= damage.toFixed()
    },
    enemyHit(resistance) {
      const enemy = this.battle.enemy
      const hero = this.battle.hero
      let damage = enemy.attackPower + enemy.attackBonus - Number(resistance)
      if (damage < 0) damage = 0
      hero.HP -= damage.toFixed()
    },
    isBattleEnded() {
      if (this.battle.enemy.HP <= 0 && this.battle.hero.HP <= 0) {
        this.battle.phase = 'end'
        this.battle.winner = 'draw'
        return true
      } else if (this.battle.enemy.HP <= 0) {
        this.battle.phase = 'end'
        this.battle.winner = 'hero'
        return true
      } else if (this.battle.hero.HP <= 0) {
        this.battle.phase = 'end'
        this.battle.winner = 'enemy'
        return true
      }
    },
    heroAttack() {
      const enemy = this.battle.enemy
      const hero = this.battle.hero
      const enemyDefRand = Math.ceil(Math.random() * 100)
      if (enemy.chooses.defence === 'none') {
        enemy.HP -= this.character.depStats.attackPower + hero.attackBonus
      } else if (enemy.chooses.defence === 'block') {
        if (enemyDefRand <= 20 + enemy.defPower) {
          this.heroHit(enemy.ARMOR)
        } else {
          this.heroHit(0)
        }
      } else if (enemy.chooses.defence === 'dodge') {
        if (enemyDefRand > enemy.defPower) {
          this.heroHit(0)
        }
      } else if (enemy.chooses.defence === 'counterAttack') {
        if (enemyDefRand > enemy.defPower) {
          this.heroHit(0)
        } else {
          this.heroHit(enemy.defPower)
          hero.HP -= enemy.attrs / 2
        }
      }
      hero.attackBonus = 0
      this.$store.dispatch('saveBattleHP', hero.HP)
    },
    enemyAttack() {
      const enemy = this.battle.enemy
      const hero = this.battle.hero
      const heroDefRand = Math.ceil(Math.random() * 100)
      if (hero.chooses.defence === 'none') {
        this.enemyHit(0)
      } else if (hero.chooses.defence === 'block') {
        if (heroDefRand <= 20 + this.character.depStats.defPower) {
          this.enemyHit(this.character.stats.ARMOR)
        } else {
          this.enemyHit(0)
        }
      } else if (hero.chooses.defence === 'dodge') {
        if (heroDefRand > this.character.depStats.defPower) {
          this.enemyHit(0)
        }
      } else if (hero.chooses.defence === 'counterAttack') {
        if (heroDefRand > this.character.depStats.defPower) {
          this.enemyHit(0)
        } else {
          this.enemyHit(this.character.depStats.defPower)
          enemy.HP -= this.character.equipment.weapon.reserve.stats.attackPower
        }
      }
      enemy.attackBonus = 0
      this.$store.dispatch('saveBattleHP', hero.HP)
    },

    fightActions() {
      const enemy = this.battle.enemy
      if (this.character.depStats.defPower > enemy.defPower) {
        this.battle.firstAttack = 'hero'
        this.heroAttack()
        if (this.isBattleEnded() === true) {
          this.battleEnd()
          return
        }
        this.enemyAttack()
        if (this.isBattleEnded() === true) {
          this.battleEnd()
          return
        }
      } else {
        this.battle.firstAttack = 'enemy'
        this.enemyAttack()
        if (this.isBattleEnded() === true) {
          this.battleEnd()
          return
        }
        this.heroAttack()
        if (this.isBattleEnded() === true) {
          this.battleEnd()
          return
        }
      }
      if (this.battle.phase !== 'end') {
        this.battle.phase = 'defence'
        this.battle.turn += 1
      }
    },
    battleEnd() {
      this.$store.dispatch('saveBattleHP', this.battle.hero.HP)
      if (this.battle.winner === 'hero') {
        this.winReward()
      } else if (this.battle.winner === 'draw') {
        this.drawReward()
      }
    },
    winReward() {
      const armorSlots = [
        'head',
        'shoulder',
        'chest',
        'arms',
        'leggins',
        'boots',
      ]
      const weaponSlots = ['LHand', 'RHand', 'THand', 'reserve']
      const lvl = this.battle.lvl

      let itemType = ''
      let itemSlot = ''
      let itemRarity = ''
      let itemCost = null
      let itemName = ''
      let grip = ''
      const itemKey = Date.now()
      let attrPoints = null

      let armorPoints = null
      let strPoints = null
      let agiPoints = null
      let intPoints = null
      let atckPowerPoints = null
      let splPowerPoints = null

      const rareModifier = Math.pow(this.battle.difficulty, 5).toFixed()
      const epicModifier = Math.pow(this.battle.difficulty, 4).toFixed()
      const legendaryModifier = Math.pow(this.battle.difficulty, 3).toFixed()

      const rarityRand = Math.floor(Math.random() * 100)
      if (rarityRand <= 70 - rareModifier) {
        itemRarity = 'common'
        attrPoints = lvl
      } else if (
        rarityRand > 70 - rareModifier &&
        rarityRand <= 90 - epicModifier
      ) {
        itemRarity = 'rare'
        attrPoints = (lvl * 1.5).toFixed()
      } else if (
        rarityRand > 90 - epicModifier &&
        rarityRand <= 98 - legendaryModifier
      ) {
        itemRarity = 'epic'
        attrPoints = (lvl * 2).toFixed()
      } else if (rarityRand > 98 - legendaryModifier && rarityRand <= 100) {
        itemRarity = 'legendary'
        attrPoints = (lvl * 3).toFixed()
      }

      if (Math.ceil(Math.random() * 10) <= 7) {
        itemType = 'armor'
        itemSlot = armorSlots[Math.floor(Math.random() * 6)]
        itemName = itemSlot
        armorPoints = Number(lvl)
        for (let i = 0; i < attrPoints; i++) {
          const randStat = Math.ceil(Math.random() * 4)
          if (randStat === 1) {
            armorPoints += 1
          } else if (randStat === 2) {
            strPoints += 1
          } else if (randStat === 3) {
            agiPoints += 1
          } else {
            intPoints += 1
          }
        }
      } else {
        itemType = 'weapon'
        itemSlot = weaponSlots[Math.floor(Math.random() * 4)]
        if (itemSlot === 'THand') {
          grip = 'Two-handed'
          if (Math.random() <= 0.5) {
            itemName = 'sword'
            atckPowerPoints = attrPoints * 2.5
          } else {
            itemName = 'staff'
            splPowerPoints = attrPoints * 2.5
          }
        } else if (itemSlot === 'LHand') {
          grip = 'Left-handed'
          if (Math.random() <= 0.5) {
            itemName = 'dagger'
            atckPowerPoints = attrPoints
          } else {
            itemName = 'wand'
            splPowerPoints = attrPoints
          }
        } else if (itemSlot === 'RHand') {
          grip = 'Right-handed'
          if (Math.random() <= 0.5) {
            itemName = 'dagger'
            atckPowerPoints = attrPoints
          } else {
            itemName = 'wand'
            splPowerPoints = attrPoints
          }
        } else if (itemSlot === 'reserve') {
          itemName = 'knife'
          grip = 'Reserve'
          atckPowerPoints = attrPoints / 2
        }
      }

      const itemStats = {
        ARMOR: Math.ceil(armorPoints),
        STR: Math.ceil(strPoints),
        AGI: Math.ceil(agiPoints),
        INT: Math.ceil(intPoints),
        attackPower: Math.ceil(atckPowerPoints),
        spellPower: Math.ceil(splPowerPoints),
      }
      for (const stat in itemStats) {
        itemCost += itemStats[stat]
      }

      const itemReward = {
        type: itemType,
        slot: itemSlot,
        rarity: itemRarity,
        cost: itemCost,
        name: grip + ' ' + itemName,
        key: itemKey,
        stats: itemStats,
      }
      const xpReward = this.battle.lvl * this.battle.difficulty

      this.$store.dispatch('saveBattleXP', xpReward)
      this.$store.dispatch('saveBattleItem', itemReward)
      this.battle.rewards.xp = xpReward
      this.battle.rewards.item = itemReward
    },
    drawReward() {
      const xpReward = this.battle.lvl * this.battle.difficulty
      this.$store.dispatch('saveBattleXP', xpReward)
    },
  },
}
</script>

<style lang="scss" scoped>
section.frame {
  width: 50%;
}
</style>
