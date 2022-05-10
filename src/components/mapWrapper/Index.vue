<template>
  <div class="map-wrapper">
    <!-- 卫星图 -->
    <SatelliteMap :initMapbox="initMapbox" :center="center" />
    <slot></slot>
  </div>
</template>
<script>
import SatelliteMap from './SatelliteMap'
export default {
  name: 'MapWrapper',
  components: {
    SatelliteMap,
  },
  props: {
    center: {
      type: Array,
    },
    initMapbox: {
      type: Function,
    },
  },
}
</script>

<style lang="scss" scoped>
.map-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
