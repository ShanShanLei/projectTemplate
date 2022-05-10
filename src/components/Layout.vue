<template>
  <div :class="['layout-wrapper']">
    <slot name="topBar"></slot>
    <div class="layout-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hasTopBar: false, // 页面是否存在TopBar
    }
  },
  computed: {},
  mounted() {},
  methods: {},
}
</script>

<style lang="scss">
.copyright {
  text-align: center;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #a1a2b9;
  position: absolute;
  bottom: -40px;
  left: 50%;
  transform: translateX(-50%);
}
</style>

<style lang="scss" scoped>
.layout-wrapper {
  flex-grow: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .layout-content {
    width: 100%;
    min-height: calc(100vh - 60px);
    margin-top: 60px;
    overflow: auto;
    padding-bottom: 50px;
    position: relative;
  }
}
</style>
