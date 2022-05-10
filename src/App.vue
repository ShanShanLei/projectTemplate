<template>
  <div id="app">
    <template>
      <router-view></router-view>
    </template>
  </div>
</template>

<script>
// import NavMenu from '@/components/NavMenu'

export default {
  components: {
    // NavMenu,
  },
  data() {
    return {}
  },
}
</script>

<style lang="scss">
[v-cloak] {
  display: none;
}

// 自定义字体
@font-face {
  font-family: 'Oswald-Medium';
  src: url('./assets/fonts/Oswald-Medium.otf');
  font-weight: normal;
  font-style: normal;
}

html {
  box-sizing: border-box;
}

#app {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: #f8f7fa;
  display: flex;
}

* {
  margin: 0;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

body {
  font-family: PingFangSC-Regular, PingFang SC !important;
  font-size: 14px;
  line-height: 1.4;
  font-weight: 400;
  text-align: left;
  background: #fff;
  color: #333;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a:focus,
a:active {
  outline: none;
}

a,
a:focus,
a:hover {
  cursor: pointer;
  color: inherit;
  text-decoration: none;
}

.clearfix {
  &:after {
    content: '';
    height: 0;
    display: block;
    visibility: hidden;
    font-size: 0;
    clear: both;
  }
}
</style>
