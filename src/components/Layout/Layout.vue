<template>
  <div class="layout-container">
      <div class="leftCon">
          <slot name="leftCon"></slot>
      </div>
      <div class="mainCon">
          <slot></slot>
      </div>
      <div class="rightCon">
          <slot name="rightCon"></slot>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.layout-container {
    width: 100%;
    height: 100%;
    display: flex;
    .mainCon{
        flex: 1 1 auto;
        overflow: hidden;
    }
    .leftCon, .rightCon {
        flex: 0 0 auto;
        overflow: hidden;
        height: 100%;
        box-sizing: border-box;
    }
}
</style>