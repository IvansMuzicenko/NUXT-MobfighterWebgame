<template>
  <div class="absolute w-full h-full">
    <span
      v-if="selectedArea"
      :style="`color: ${rangeHover};`"
      class="absolute w-full text-3xl text-center levelRange"
      >({{
        selectedAreaIndex * 10 + 1 + '-' + (selectedAreaIndex + 1) * 10
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
          v-for="(area, index) in areas"
          :key="'a' + index"
          :lat-lngs="area"
          :l-style="'a' + index == selectedArea ? hoverStyle : style"
          @mouseover="hoverArea('a', index)"
          @mouseleave="outArea"
        >
          <l-popup v-if="lvl >= index * 10 + 1">
            Choose fight difficulty:
            <ui-base-button
              v-for="difficulty in difficulties"
              :key="difficulty"
              link
              :to="`fight?lvl=${lvl}&difficulty=${difficulty.toLowerCase()}&minlvl=${
                index * 10 + 1
              }&maxlvl=${(index + 1) * 10}`"
              class="block w-full mt-4 outline"
            >
              {{ difficulty }}
            </ui-base-button>
          </l-popup>
        </l-polygon>
        <l-polygon
          v-for="(city, index) in cities"
          :key="'c' + index"
          :lat-lngs="city"
          :l-style="
            'c' + index == selectedArea ? citiesHoverStyle : citiesStyle
          "
          @mouseover="hoverArea('c', index)"
          @mouseleave="outArea"
        >
          <l-popup v-if="lvl >= index * 10 + 1">
            <ui-base-button
              link
              :to="`quests?minlvl=${index * 10 + 1}&maxlvl=${(index + 1) * 10}`"
              class="w-full mt-4 outline"
            >
              Quests
            </ui-base-button>
            <br />
            <ui-base-button
              link
              :to="`market?zone=${index}&minlvl=${index * 10 + 1}&maxlvl=${
                (index + 1) * 10
              }`"
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
      selectedAreaIndex: null,
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
    hoverArea(key, index) {
      this.selectedAreaIndex = index
      this.selectedArea = key + index

      if (index * 10 + 1 > this.lvl) {
        this.rangeHover = '#ff7070'
        this.hoverStyle = {
          color: 'red',
          fillColor: 'red',
          weight: 15,
          fillOpacity: 0.1,
          opacity: 0.1,
        }
        this.citiesHoverStyle = {
          color: 'red',
          fillColor: 'red',
          weight: 15,
          fillOpacity: 0.1,
          opacity: 0.1,
        }
      }

      if ((index + 1) * 10 + 2 < this.lvl) {
        this.rangeHover = 'lightgrey'
        this.hoverStyle = {
          color: 'black',
          fillColor: 'black',
          weight: 15,
          fillOpacity: 0.2,
          opacity: 0.2,
        }
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
      this.selectedAreaIndex = null
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
