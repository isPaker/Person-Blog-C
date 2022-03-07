<template>
  <div class="test-container">
      <Layout>
          <template v-slot:leftCon>
              <div class="left">
                  左侧内容
              </div>
          </template>
          <template>
              <div class="main">
                  中间内容
              </div>
          </template>
          <template v-slot:rightCon>
              <div class="right">
                  右边内容
              </div>
          </template>
      </Layout>
  </div>
</template>

<script>
import Layout from "./Layout.vue";
export default {
    components: {
        Layout
    }
}
</script>

<style scoped lang="less">
.test-container {
    width: 1000px;
    height: 600px;
    border: 2px solid;
    margin: 0 auto;
    .left {
        width: 200px;
        height: 100%;
        background: lightblue;
    }
    .right {
        width: 150px;
        height: 100%;
        background: lightcoral;
    }
    .main {
        width: 100%;
        height: 100%;
        background: lightgreen;
    }
}
</style>