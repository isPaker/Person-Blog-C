<template>
  <div class="test-container">
      <Sidebar />
  </div>
</template>

<script>
import "@/styles/reset.less";
import Sidebar from "./Sidebar.vue";
export default {
    components: {
        Sidebar
    }
}
</script>

<style>
.test-container {
    width: 250px;
    height: 600px;
    border: 2px solid;
    margin: 0 auto;
}
</style>