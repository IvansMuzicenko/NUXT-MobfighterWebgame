<template>
  <div class="absolute w-full h-full">
    <span
      v-if="areas.indexOf(selectedArea) !== -1"
      :style="`color: ${rangeHover};`"
      class="absolute w-full text-3xl text-center levelRange"
      >({{
        areas.indexOf(selectedArea) * 10 +
        1 +
        '-' +
        (areas.indexOf(selectedArea) + 1) * 10
      }})</span
    >
    <span
      v-if="cities.indexOf(selectedArea) !== -1"
      :style="`color: ${rangeHover};`"
      class="absolute w-full text-3xl text-center levelRange"
      >({{
        cities.indexOf(selectedArea) * 10 +
        1 +
        '-' +
        (cities.indexOf(selectedArea) + 1) * 10
      }})</span
    >
    <client-only>
      <l-map
        ref="map"
        :options="{
          dragging: false,
          zoomControl: false,
          attributionControl: false,
          doubleClickZoom: false,
          boxZoom: false,
        }"
        :center="[768, 1024]"
        :min-zoom="-0.7"
        :max-zoom="-0.7"
        :crs="crs"
        class="w-full h-full"
      >
        <l-image-overlay :url="url" :bounds="bounds" :max-bounds="bounds" />
        <l-polygon
          v-for="area in areas"
          :key="areas.indexOf(area)"
          :lat-lngs="area"
          :l-style="area == selectedArea ? hoverStyle : style"
          @mouseover="hoverArea(area)"
          @mouseleave="outArea"
        >
          <l-popup v-if="lvl >= areas.indexOf(area) * 10 + 1">
            Choose fight difficulty:
            <ui-base-button
              v-for="difficulty in difficulties"
              :key="difficulty"
              link
              :to="`fight?lvl=${lvl}&difficulty=${difficulty.toLowerCase()}&minlvl=${
                areas.indexOf(area) * 10 + 1
              }&maxlvl=${(areas.indexOf(area) + 1) * 10}`"
              class="block w-full mt-4 outline"
            >
              {{ difficulty }}
            </ui-base-button>
          </l-popup>
        </l-polygon>
        <l-polygon
          v-for="city in cities"
          :key="'c' + cities.indexOf(city)"
          :lat-lngs="city"
          :l-style="city == selectedArea ? citiesHoverStyle : citiesStyle"
          @mouseover="hoverArea(city)"
          @mouseleave="outArea"
        >
          <l-popup v-if="lvl >= cities.indexOf(city) * 10 + 1">
            <ui-base-button
              link
              :to="`quests?minlvl=${cities.indexOf(city) * 10 + 1}&maxlvl=${
                (cities.indexOf(city) + 1) * 10
              }`"
              class="w-full mt-4 outline"
            >
              Quests
            </ui-base-button>
            <br />
            <ui-base-button
              link
              :to="`market?zone=${cities.indexOf(city)}&minlvl=${
                cities.indexOf(city) * 10 + 1
              }&maxlvl=${(cities.indexOf(city) + 1) * 10}`"
              class="w-full mt-4 outline"
            >
              Market
            </ui-base-button>
          </l-popup>
        </l-polygon>
      </l-map>
    </client-only>
  </div>
</template>

<script>
export default {
  data() {
    return {
      difficulties: ['Easy', 'Normal', 'Hard'],
      crs: this.$L.CRS.Simple,
      url: 'MobFighter.jpg',
      bounds: this.$L.latLngBounds([
        [0, 0],
        [1536, 2048],
      ]),
      areas: [],
      cities: [],
      selectedArea: null,
      rangeHover: '#f3ff70',
      style: { color: 'black', weight: 4, fillOpacity: 0, opacity: 0.2 },
      hoverStyle: {
        color: 'white',
        weight: 15,
        fillColor: 'white',
        fillOpacity: 0.1,
        opacity: 0.2,
      },
      citiesStyle: { color: 'green', weight: 7, fillOpacity: 0, opacity: 0.3 },
      citiesHoverStyle: {
        color: 'green',
        weight: 15,
        fillColor: 'green',
        fillOpacity: 0.3,
        opacity: 0.3,
      },
    }
  },
  async fetch() {
    const areasFirst = await this.$content('/mapsAreas/areasFirst').fetch()
    this.areas = areasFirst.areas
    this.cities = areasFirst.cities
  },
  computed: {
    lvl() {
      return this.$store.getters.character.lvl
    },
    HP() {
      return this.$store.getters.character.depStats.HP
    },
  },
  methods: {
    hoverArea(area) {
      this.selectedArea = area

      if (this.areas.indexOf(area) * 10 + 1 > this.lvl) {
        this.rangeHover = '#ff7070'
        this.hoverStyle = {
          color: 'red',
          fillColor: 'red',
          weight: 15,
          fillOpacity: 0.1,
          opacity: 0.1,
        }
      }

      if (this.cities.indexOf(area) * 10 + 1 > this.lvl) {
        this.rangeHover = '#ff7070'
        this.citiesHoverStyle = {
          color: 'red',
          fillColor: 'red',
          weight: 15,
          fillOpacity: 0.1,
          opacity: 0.1,
        }
      }
      if (
        this.areas.includes(area) &&
        (this.areas.indexOf(area) + 1) * 10 + 2 < this.lvl
      ) {
        this.rangeHover = 'lightgrey'
        this.hoverStyle = {
          color: 'black',
          fillColor: 'black',
          weight: 15,
          fillOpacity: 0.2,
          opacity: 0.2,
        }
      }
      if (
        this.cities.includes(area) &&
        (this.cities.indexOf(area) + 1) * 10 + 2 < this.lvl
      ) {
        this.rangeHover = 'lightgrey'
        this.citiesHoverStyle = {
          color: 'black',
          fillColor: 'black',
          weight: 15,
          fillOpacity: 0.2,
          opacity: 0.2,
        }
      }
    },
    outArea() {
      this.rangeHover = '#f3ff70'
      this.selectedArea = null
      this.hoverStyle = {
        color: 'white',
        fillColor: 'white',
        weight: 15,
        fillOpacity: 0.1,
        opacity: 0.2,
      }
      this.citiesHoverStyle = {
        color: 'green',
        fillColor: 'green',
        weight: 15,
        fillOpacity: 0.3,
        opacity: 0.3,
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.levelRange {
  text-shadow: 0 0 1rem black, 1px 1px 1rem black, -1px -1px 1rem black;
  top: 70px;
  z-index: 100000;
}
.leaflet-container {
  background: url('/map-bg-cover.jpg');
  background-size: 100% 100%;
}
</style>
