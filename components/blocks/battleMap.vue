<template>
  <div class="map-wrapper">
    <client-only>
      <l-map
        ref="map"
        :options="{
          dragging: false,
          zoomControl: false,
          attributionControl: false,
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
          :l-style="style"
          class="area"
        ></l-polygon>
      </l-map>
    </client-only>
  </div>
</template>

<script>
export default {
  data() {
    return {
      crs: this.$L.CRS.Simple,
      url: 'MobFighter.jpg',
      bounds: this.$L.latLngBounds([
        [0, 0],
        [1536, 2048],
      ]),
      areas: [],
      style: { color: 'black', weight: 4, fillOpacity: 0, opacity: 0.2 },
    }
  },
  async fetch() {
    const areasFirst = await this.$content('/mapsAreas/areasFirst').fetch()
    this.areas = areasFirst.areas
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
