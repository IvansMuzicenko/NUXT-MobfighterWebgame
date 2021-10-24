<template>
  <div class="map-wrapper">
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
        class="map"
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
              class="outline w-full mt-4 block"
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
              class="outline w-full mt-4"
            >
              Quests
            </ui-base-button>
            <br />
            <ui-base-button
              link
              :to="`market?minlvl=${cities.indexOf(city) * 10 + 1}&maxlvl=${
                (cities.indexOf(city) + 1) * 10
              }`"
              class="outline w-full mt-4"
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
        this.hoverStyle = {
          color: 'red',
          fillColor: 'red',
          weight: 15,
          fillOpacity: 0.1,
          opacity: 0.1,
        }
      }
      if (this.cities.indexOf(area) * 10 + 1 > this.lvl) {
        this.citiesHoverStyle = {
          color: 'red',
          fillColor: 'red',
          weight: 15,
          fillOpacity: 0.1,
          opacity: 0.1,
        }
      }
      if ((this.areas.indexOf(area) + 1) * 10 + 2 < this.lvl) {
        this.hoverStyle = {
          color: 'black',
          fillColor: 'black',
          weight: 15,
          fillOpacity: 0.2,
          opacity: 0.2,
        }
      }
      if ((this.cities.indexOf(area) + 1) * 10 + 2 < this.lvl) {
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
.map-wrapper {
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 0;
}
.map {
  height: 100%;
  width: 100%;
}
.leaflet-container {
  background: url('/map-bg-cover.jpg');
  background-size: 100% 100%;
}
</style>
