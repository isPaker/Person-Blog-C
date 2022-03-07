<template>
  <div class="app-container">
      <Layout>
          <template #leftCon>
              <div class="leftSide">
                <Sidebar />
              </div>
          </template>
          <template>
            <div class="main">
                <RouterView />
            </div>
          </template>
      </Layout>
      <ToTop />
  </div>
</template>

<script>
import Layout from "@/components/Layout/Layout.vue";
import Sidebar from "@/components/Sidebar/Sidebar.vue";
import ToTop from "@/components/ToTop"
export default {
  components: {
      Layout,
      Sidebar,
      ToTop,
  }
}
</script>

<style scoped lang="less">
@import "~@/styles/mixin.less";
.app-container {
    .self-fill(fixed);
    background: #fff;
    .leftSide {
      height: 100%;
      box-sizing: border-box;
    }
    .main {
      width: 100%;
      height: 100%;
    }
}
</style>
