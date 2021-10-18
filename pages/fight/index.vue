<template>
  <div>
    <h3 class="d-flex justify-content-center">Fight!</h3>
    <h4 class="d-flex justify-content-center">Turn {{ battle.turn }}</h4>
    <div v-if="battle.phase != 'end'" class="frame d-flex">
      <section class="frame">
        <div>
          <span class="d-flex justify-content-center">
            {{ character.nickname }}
          </span>
          <span class="d-flex justify-content-center">
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
            <span class="d-flex justify-content-center"> Choose defence </span>
            <div class="d-flex">
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
            <span class="d-flex justify-content-center"> Choose attack </span>
            <ui-base-button class="outline--small" @click="attack('attack')"
              >Attack with weapon</ui-base-button
            >
            <ui-base-button class="outline--small" @click="attack('spell')"
              >Choose spell</ui-base-button
            >
          </section>
          <section v-if="battle.phase === 'action'">
            <span class="d-flex justify-content-center"> Choose action </span>
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
          <span class="d-flex justify-content-center">
            {{ battle.enemy.name }}
          </span>
          <span class="d-flex justify-content-center"
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
    <div v-if="battle.phase == 'end'">
      <p>Battle ended. {{ battle.winner }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      battle: {
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
          attrs: this.$route.query.lvl,
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
      },
    }
  },
  computed: {
    character() {
      return this.$store.getters.character
    },
  },

  mounted() {
    this.battle.enemy.attrs = this.$route.query.lvl
    this.battle.enemy.HP = this.battle.enemy.maxHP
    this.battle.enemy.MP = this.battle.enemy.maxMP

    if (this.$route.query.difficulty === 'medium') {
      this.battle.enemy.attrs *= 2
    } else if (this.$route.query.difficulty === 'hard') {
      this.battle.enemy.attrs *= 3
    }
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
      enemy.HP -= damage
      console.log('hit', damage)
    },
    enemyHit(resistance) {
      const enemy = this.battle.enemy
      const hero = this.battle.hero
      let damage = enemy.attackPower + enemy.attackBonus - Number(resistance)
      if (damage < 0) damage = 0
      hero.HP -= damage
      console.log('enemyhit', damage)
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
          this.hero.HP -= 1 // need to add reserve item to enemy
        }
      }
      hero.attackBonus = 0
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
      if (this.battle.winner === 'hero') {
        console.log('winner hero')
        // this.winReward()
      } else if (this.battle.winner === 'draw') {
        console.log('winner draw')
        // this.drawReward()
      }
    },
  },
}
</script>

<style lang="scss" scoped>
section.frame {
  width: 50%;
}
</style>
