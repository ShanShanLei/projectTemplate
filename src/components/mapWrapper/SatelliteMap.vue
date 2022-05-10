<template>
  <div id="satellite-map" ref="satelliteMap"></div>
</template>

<script>
/* 卫星图 */
import mapboxgl from 'mapbox-gl'
export default {
  name: 'SatelliteMap',
  components: {},
  data() {
    return {}
  },
  props: {
    center: {
      type: Array,
    },
    initMapbox: {
      type: Function,
    },
  },
  mounted() {
    this.initMap()
  },
  methods: {
    // 地图初始化
    initMap() {
      mapboxgl.accessToken =
        'pk.eyJ1IjoieWluZ2pvaG4iLCJhIjoiY2p6czRoMDNrMHpzNDNucG0yajRwcGZyayJ9.-Wlh6XQOmGrjI8mnBd3EZA'
      let mapboxInstance = new mapboxgl.Map({
        container: 'satellite-map',
        style: {
          version: 8,
          glyphs: 'mapbox://fonts/mapbox/{fontstack}/{range}.pbf',
          sources: {
            'satelite-tiles': {
              type: 'raster',
              tiles: [
                'https://t0.tianditu.gov.cn/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=92c80749e603be56bda8fcbbe51df6f8',
              ],
              tileSize: 256,
            },
            biaozhu: {
              type: 'raster',
              tiles: [
                'https://t0.tianditu.gov.cn/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=92c80749e603be56bda8fcbbe51df6f8',
              ],
              tileSize: 256,
            },
          },
          layers: [
            {
              id: 'satelite',
              type: 'raster',
              source: 'satelite-tiles',
              minzoom: 0,
              maxzoom: 22,
            },
          ],
        },
        zoom: 14,
        maxZoom: 19,
        center: this.center || [119.731517, 30.239806], // 支持全国范围区域标记农田，默认定位到临安
      })

      mapboxInstance.on('load', () => {
        // 将 mapbox 实例传递到父组件
        this.initMapbox(mapboxInstance)
      })
    },
  },
}
</script>

<style lang="scss" scope>
#satellite-map {
  height: 100%;
  width: 100%;
  border-radius: 6px;

  .mapboxgl-ctrl-bottom-left {
    display: none;
  }
}
</style>
