<template>
  <div class="test-container">
      <Empty />
  </div>
</template>

<script>
import Empty from "./Empty.vue";
export default {
    components: {
        Empty
    }
}
</script>

<style scoped lang="less">
.test-container {
    width: 400px;
    height: 400px;
    border: 2px solid;
    margin: 0 auto;
    position: relative;
}
</style>